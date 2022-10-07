import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"
import { trpc } from "../lib/trpc"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobeLayout>
      <Component {...pageProps} />
    </GlobeLayout>
  )
}

export default trpc.withTRPC(MyApp)
