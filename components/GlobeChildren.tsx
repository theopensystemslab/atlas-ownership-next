import { pipe } from "fp-ts/lib/function"
import { Fragment } from "react"
import { RA } from "../lib/fp"
import { trpc } from "../lib/trpc"
import GlobeEntry from "./GlobeEntry"

const GlobeChildren = () => {
  const { data: entries = [] } = trpc.entries.useQuery()

  const entryChildren = pipe(
    entries,
    RA.filter((entry) => !!entry.location?.geopoint),
    RA.map((entry) => <GlobeEntry key={entry.slug.current} entry={entry} />)
  )
  return <Fragment>{entryChildren}</Fragment>
}

export default GlobeChildren
