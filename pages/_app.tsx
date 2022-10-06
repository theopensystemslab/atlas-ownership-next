import "../styles/globals.css"
import type { AppProps } from "next/app"
import GlobeLayout from "../components/GlobeLayout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobeLayout>
      <div className="absolute">
        <Component {...pageProps} />
      </div>
    </GlobeLayout>
  )
}

export default MyApp
