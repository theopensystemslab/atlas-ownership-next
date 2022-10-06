import { Fragment } from "react"
import { pipe } from "fp-ts/lib/function"
import { RA } from "../lib/fp"
import GlobeEntry from "./GlobeEntry"
import { useStore } from "../lib/store"

const GlobeChildren = () => {
  const { entries } = useStore()

  const entryChildren = pipe(
    entries,
    RA.filter((entry) => !!entry.location.geopoint),
    RA.takeLeft(10),
    RA.map((entry) => <GlobeEntry key={entry.slug.current} entry={entry} />)
  )
  return <Fragment>{entryChildren}</Fragment>
}

export default GlobeChildren
