import "../styles/globals.css"
import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobeLayout>
      <Component {...pageProps} />
    </GlobeLayout>
  )
}

export default MyApp
