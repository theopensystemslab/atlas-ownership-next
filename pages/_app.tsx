import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"
import { useEntriesQuery, usePatternClassesQuery, usePatternsQuery } from "../lib/queries"
import { trpc } from "../lib/trpc"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  useEntriesQuery()
  usePatternsQuery()
  usePatternClassesQuery()
  
  return (
    <GlobeLayout>
      <Component {...pageProps} />
    </GlobeLayout>
  )
}

export default trpc.withTRPC(MyApp)
