import { NextPage } from "next"
import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import GlobeLayout from "../components/layout/GlobeLayout"
import { trpc } from "../lib/trpc"
import "../styles/globals.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? GlobeLayout
  return getLayout(<Component {...pageProps} />)
}

export default trpc.withTRPC(MyApp as any)
