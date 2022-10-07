import { pipe } from "fp-ts/lib/function"
import { O, RA } from "./fp"
import { trpc } from "./trpc"

export const entriesQuery = `*[_type == "entry"]`
export const entryBySlugQuery = `*[slug.current == $slug]`
export const patternsQuery = `*[_type == "pattern"]`
export const patternClassesQuery = `*[_type == "patternClass"] | order(order)`

export const useGetEntryFromSlug = () => {
  const { data: entries } = trpc.entries.useQuery()

  return (slug: string) => pipe(
    entries ?? [],
    RA.findFirst((entry) => entry.slug.current === slug),
    O.toNullable
  )
}
