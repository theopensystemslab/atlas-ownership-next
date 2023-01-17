import { pipe } from "fp-ts/lib/function"
import { O, RA } from "./fp"
import { trpc } from "./trpc"
import { Entry } from "./types"

export const entriesQuery = `*[_type == "entry"]{...,  mainImage {..., file {..., asset-> } } }`
export const patternsQuery = `*[_type == "pattern"]`
export const patternClassesQuery = `*[_type == "patternClass"] | order(order)`
export const patternsWithClassQuery = `*[_type == "pattern"]{..., class -> }[ count(*[_type == "entry" && references(^._id)]) > 0] | order(order)`

export const useGetEntryFromSlug = () => {
  const { data: entries } = trpc.entries.useQuery()

  return (slug: string | string[] | undefined): Entry | null =>
    pipe(
      entries ?? [],
      RA.findFirst((entry) => entry?.slug?.current === slug),
      O.toNullable
    )
}

export const patternInfoQuery = (patternClassName: string | null) => (`
  {
    "rights": 
      *[_type == "pattern"] { 
        ..., 
        class->, 
        "entryCount": count(* [_type == "entry" && references(^._id)])
      }
      [class.name == "${patternClassName}" && type == "right" && entryCount > 0]
      | order(entryCount desc),
    "obligations": 
      *[_type == "pattern"] {
        ..., 
        class->, 
        "entryCount": count(* [_type == "entry" && references(^._id)])
      }
      [class.name == "${patternClassName}" && type == "obligation" && entryCount > 0]
      | order(entryCount desc),
  }
`)