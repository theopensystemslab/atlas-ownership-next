import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { entriesQuery, entryBySlugQuery } from "../../lib/queries"
import { sanityClient } from "../../lib/sanity.server"
import { Entry } from "../../lib/types"
import * as z from "zod"

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

export const getStaticProps: GetStaticProps<{ entry: Entry }> = async ({
  params,
}) => {
  const { slug } = z
    .object({
      slug: z.string().min(1),
    })
    .parse(params)
  const entries = await sanityClient.fetch<Entry[]>(entryBySlugQuery, {
    slug,
  })
  return {
    // Passed to the page component as props
    props: { entry: entries[0] },
  }
}

const EntryPage = ({
  entry,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Render post...
  return (
    <div className="bg-rent">
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </div>
  )
}

export default EntryPage
