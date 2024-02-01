"use client"
import { A, O } from "@/app/utils/fp"
import { Entry, Pattern, PatternClass } from "@/app/utils/sanity/types"
import { useStore } from "@/app/utils/store"
import { pipe } from "fp-ts/lib/function"
import { Fragment } from "react"
import Marker from "./Marker"

type Props = {
  entries: Entry[]
  patterns: Pattern[]
  patternClasses: PatternClass[]
}

const Markers = (props: Props) => {
  const { entries, patterns, patternClasses } = props

  const { unclusteredSlugs } = useStore()

  return (
    <Fragment>
      {pipe(
        unclusteredSlugs,
        A.filterMap((slug) => {
          return pipe(
            entries,
            A.findFirstMap((entry) =>
              entry.slug?.current === slug
                ? O.some(
                    pipe(entry, (entry) => {
                      const {
                        geopoint: { lat, lng },
                      } = entry.location ?? { geopoint: { lat: 0, lng: 0 } }

                      return (
                        <Marker
                          key={slug}
                          lat={lat}
                          lng={lng}
                          entry={entry}
                          patterns={patterns}
                          patternClasses={patternClasses}
                        />
                      )
                    })
                  )
                : O.none
            )
          )
        })
      )}
    </Fragment>
  )
}

export default Markers
