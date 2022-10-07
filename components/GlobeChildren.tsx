import { pipe } from "fp-ts/lib/function"
import { Fragment } from "react"
import { RA } from "../lib/fp"
import { useStore } from "../lib/store"
import GlobeEntry from "./GlobeEntry"

const GlobeChildren = () => {
  const { entries } = useStore()

  const entryChildren = pipe(
    entries,
    RA.filter((entry) => !!entry.location?.geopoint),
    RA.map((entry) => <GlobeEntry key={entry.slug.current} entry={entry} />)
  )
  return <Fragment>{entryChildren}</Fragment>
}

export default GlobeChildren
