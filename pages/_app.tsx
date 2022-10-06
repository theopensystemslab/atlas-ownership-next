import "../styles/globals.css"
import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"
import useSWR from "swr"
import { sanityClient } from "../lib/sanity.server"
import { entriesQuery } from "../lib/queries"
import { Entry } from "../lib/types"
import store from "../lib/store"

function MyApp({ Component, pageProps }: AppProps) {
  useSWR<Entry[]>("entries", () => sanityClient.fetch(entriesQuery), {
    onSuccess: (entries) => {
      if (store.entries.length === 0) store.entries = entries
    },
  })
  return (
    <GlobeLayout>
      <Component {...pageProps} />
    </GlobeLayout>
  )
}

export default MyApp
