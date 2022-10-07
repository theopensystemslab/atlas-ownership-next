import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"
import { useEntriesQuery } from "../lib/queries"
import { trpc } from "../lib/trpc"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  useEntriesQuery()
  return (
    <GlobeLayout>
      <Component {...pageProps} />
    </GlobeLayout>
  )
}

export default trpc.withTRPC(MyApp)
