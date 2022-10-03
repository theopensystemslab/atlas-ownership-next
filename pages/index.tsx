import type { GetStaticProps, NextPage } from "next"
import { entriesQuery } from "../lib/queries"
import { sanityClient } from "../lib/sanity.server"

const Home: NextPage = (props: any) => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const foo = await sanityClient.fetch(entriesQuery)
  return {
    props: { foo },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default Home
