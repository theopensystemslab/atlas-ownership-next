import { pipe } from "fp-ts/lib/function"
import { groq } from "next-sanity"
import { O, RA } from "./fp"
import { trpc } from "./trpc"
import { Entry } from "./types"

export const entriesQuery = groq`
  *[_type == "entry"]
  {
    ...,  
    entryRating-> { grade },
    mainImage {..., file {..., asset-> } },
    'patterns': terms[].pattern->{ name },
    terms[]{ ..., termLegalMechanisms[]-> }
  }`

export const patternsQuery = groq`*[_type == "pattern"] {..., "iconUrl": icon.asset -> url} `
export const patternClassesQuery = groq`*[_type == "patternClass"] | order(order)`
export const patternsWithClassQuery = groq`
  *[_type == "pattern"]
  {..., class -> , "iconUrl": icon.asset -> url}
  [ count(*[_type == "entry" && references(^._id)]) > 0] | order(order)`

export const useGetEntryFromSlug = () => {
  const { data: entries } = trpc.entries.useQuery()

  return (slug: string | string[] | undefined): Entry | null =>
    pipe(
      entries ?? [],
      RA.findFirst((entry) => entry?.slug?.current === slug),
      O.toNullable
    )
}

export const patternInfoQuery = groq`
  *[_type == "patternClass"] {
    name,
    "rights": 
      *[_type == "pattern"] { 
        ..., 
        class->, 
        "iconUrl": icon.asset -> url,
        "entryCount": count(* [_type == "entry" && references(^._id)])
      }
      [class.name == ^.name && type == "right" && entryCount > 0]
      | order(entryCount desc),
    "obligations": 
      *[_type == "pattern"] {
        ..., 
        class->,
        "iconUrl": icon.asset -> url,
        "entryCount": count(* [_type == "entry" && references(^._id)])
      }
      [class.name == ^.name && type == "obligation" && entryCount > 0]
      | order(entryCount desc),
  } | order(order)
`

export const tenureTypeQuery = (
  tenureTypes: string[] | undefined,
  id: string | undefined
) => groq`
  *[_type == "entry" && count((tenureType)
  [@ in ${JSON.stringify(tenureTypes)}]) > 0 && _id != "${id}"]
  { dates, slug, location, name, _id }
`

export const entriesByPatternIdQuery = (
  patternId: string | undefined,
  entryId: string | undefined
) => groq`
    *[_type == "entry" && references("${patternId}") && _id != "${entryId}"]
    { dates, slug, location, name, _id }
`
export const contributorsQuery = groq`array::unique(*[_type == "entry" && defined(contributors)].contributors[].name)`

export const pageQuery = (pageSlug: string | undefined) => groq`*[_type == "page" && slug == "${pageSlug}"][0]`
