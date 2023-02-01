import * as Fathom from "fathom-client"
import { NextPage } from "next"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ReactElement, ReactNode, useEffect } from "react"
import GlobeLayout from "../components/layout/GlobeLayout"
import { trpc } from "../lib/trpc"
import SEO from "../next-seo.config"
import "../styles/globals.css"
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? GlobeLayout
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE!, {
      includedDomains: ["atlasofownership.org"],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router.events])

  return getLayout(
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default trpc.withTRPC(MyApp as any)
