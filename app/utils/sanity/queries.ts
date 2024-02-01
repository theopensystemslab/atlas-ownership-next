import { groq } from "next-sanity"
import { client } from "./client"
import {
  CarouselEntry,
  Entry,
  Page,
  Pattern,
  PatternClass,
  PatternInfo,
} from "./types"
import { flow } from "fp-ts/lib/function"

export const entriesQuery = groq`
  *[_type == "entry"]
  {
    ...,  
    entryRating-> { grade },
    mainImage {..., file {..., asset-> } },
    'patterns': terms[].pattern->{ name },
    terms[]{ ..., termLegalMechanisms[]-> }
  }
`

export const getEntries = () => client.fetch<Entry[]>(entriesQuery)

export const entryQuery = (slug: string) =>
  groq`
  *[_type == "entry" && slug.current == "${slug}"][0]
  {
    ...,  
    entryRating-> { grade },
    mainImage {..., file {..., asset-> } },
    'patterns': terms[].pattern->{ name },
    terms[]{ ..., termLegalMechanisms[]-> }
  
  }`

export const getEntry = (slug: string) => client.fetch<Entry>(entryQuery(slug))

export const patternsQuery = groq`*[_type == "pattern"] {..., "iconUrl": icon.asset -> url} `

export const getPatterns = () => client.fetch<Pattern[]>(patternsQuery)

export const patternClassesQuery = groq`*[_type == "patternClass"] | order(order)`

export const getPatternClasses = () =>
  client.fetch<PatternClass[]>(patternClassesQuery)

export const patternsWithClassQuery = groq`
  *[_type == "pattern"]
  {..., class -> , "iconUrl": icon.asset -> url}
  [ count(*[_type == "entry" && references(^._id)]) > 0] | order(order)`

export const getPatternsWithClass = () =>
  client.fetch<Pattern[]>(patternsWithClassQuery)

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

export const getPatternInfo = () =>
  client.fetch<PatternInfo[]>(patternInfoQuery)

export const relatedEntriesByTenureTypeQuery = (
  tenureTypes: string[] | undefined,
  id: string | undefined
) => groq`
  *[_type == "entry" && count((tenureType)
  [@ in ${JSON.stringify(tenureTypes)}]) > 0 && _id != "${id}"]
  { dates, slug, location, name, _id }
`

export const getRelatedEntriesByTenureQuery = flow(
  relatedEntriesByTenureTypeQuery,
  (q) => client.fetch<CarouselEntry[]>(q)
)

export const relatedEntriesByPatternQuery = (
  patternId: string | undefined,
  entryId: string | undefined
) => groq`
    *[_type == "entry" && references("${patternId}") && _id != "${entryId}"]
    { dates, slug, location, name, _id }
`

export const getRelatedEntriesByPattern = flow(
  relatedEntriesByPatternQuery,
  (q) => client.fetch<CarouselEntry[]>(q)
)

export const contributorsQuery = groq`array::unique(*[_type == "entry" && defined(contributors)].contributors[].name)`

export const getContributors = () => client.fetch<string[]>(contributorsQuery)

export const pageQuery = (pageSlug: string | undefined) =>
  groq`*[_type == "page" && slug == "${pageSlug}"][0]`

export const getPage = flow(pageQuery, (q) => client.fetch<Page>(q))

export const footerLogosQuery = groq`*[_type == "footerLogo"] {..., logo { asset-> { url } }} | order(order)`

export const getFooterLogos = () => client.fetch<any[]>(footerLogosQuery)
