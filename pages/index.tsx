import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect } from "react"
import { entriesQuery } from "../lib/queries"
import { sanityClient } from "../lib/sanity.server"
import store from "../lib/store"
import { Entry } from "../lib/types"

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { entries } = props

  useEffect(() => {
    store.entries = entries
  }, [entries])

  return null
}

export const getStaticProps: GetStaticProps<{ entries: Entry[] }> = async ({
  preview = false,
}) => {
  const entries = await sanityClient.fetch<Entry[]>(entriesQuery)
  return {
    props: { entries },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default Home
