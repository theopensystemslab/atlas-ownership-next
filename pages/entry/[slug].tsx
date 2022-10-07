import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import * as z from "zod"
import _ from "lodash"

import { entriesQuery, entryBySlugQuery, patternClassesQuery, patternsQuery } from "../../lib/queries"
import { sanityClient } from "../../lib/sanity.server"
import { Entry, Pattern, PatternClass } from "../../lib/types"
import Chart from "../../components/Chart"

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await sanityClient.fetch<Entry[]>(entriesQuery)
  const paths = entries.map((entry: Entry) => ({
    params: { slug: entry.slug.current },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ entry: Entry, patterns: Pattern[], patternClasses: PatternClass[] }> = async ({
  params,
}) => {
  const { slug } = z
    .object({
      slug: z.string().min(1),
    })
    .parse(params)
  
  // Fetch the entry matching this slug
  const entries = await sanityClient.fetch<Entry[]>(entryBySlugQuery, {
    slug,
  })

  // Fetch all patterns and pattern classes to join to the entry's list of terms
  const patterns = await sanityClient.fetch<Pattern[]>(patternsQuery)
  const patternClasses = await sanityClient.fetch<PatternClass[]>(patternClassesQuery)

  return {
    // Passed to the page component as props
    props: { entry: entries[0], patterns: patterns, patternClasses: patternClasses },
  }
}

const EntryPage = ({
  entry, patterns, patternClasses
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Render post...
  return (
    <div>
      <h1 className="m-2">{entry.name}</h1>
      <div id="chart-container" className="max-w-[800px]">
        <Chart showLabels={true} terms={entry.terms} patterns={patterns} patternClasses={patternClasses} />
      </div>
      {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
    </div>
  )
}

export default EntryPage
