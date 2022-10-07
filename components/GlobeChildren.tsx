import { pipe } from "fp-ts/lib/function"
import { useRouter } from "next/router"
import { Fragment, useCallback, useEffect } from "react"
import { RA } from "../lib/fp"
import store from "../lib/store"
import { trpc } from "../lib/trpc"
import GlobeEntry from "./GlobeEntry"

const GlobeChildren = () => {
  const { data: entries = [] } = trpc.entries.useQuery()

  const router = useRouter()

  const handleRouteChange = useCallback(() => {
    if (router.asPath === "/") store.lastBirdseyeViewState = store.viewState
  }, [router.asPath])

  useEffect(() => {
    router.events.on("beforeHistoryChange", handleRouteChange)
    router.beforePopState((popstate) => {
      if (popstate.as === "/") store.map?.flyTo(store.lastBirdseyeViewState)
      return true
    })
    return () =>
      void router.events.off("beforeHistoryChange", handleRouteChange)
  }, [handleRouteChange, router, router.events])

  const entryChildren = pipe(
    entries,
    RA.filter((entry) => !!entry.location?.geopoint),
    RA.map((entry) => <GlobeEntry key={entry.slug.current} entry={entry} />)
  )
  return <Fragment>{entryChildren}</Fragment>
}

export default GlobeChildren
