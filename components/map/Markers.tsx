import { pipe } from "fp-ts/lib/function"
import Link from "next/link"
import React, { Fragment } from "react"
import { Marker } from "react-map-gl"
import { A, NEA } from "../../lib/fp"
import store, { useStore } from "../../lib/store"
import { Entry } from "../../lib/types"
import { Chart } from "../Chart"

type Props = {
  entries: Entry[]
}

const Markers = (props: Props) => {
  const { entries = [] } = props

  const slugEntries = pipe(
    entries,
    A.filter((x) => !!x.slug?.current),
    NEA.groupBy((entry) => {
      if (!entry.slug?.current) throw new Error("")
      else return entry.slug.current
    })
  )

  const { unclusteredSlugs } = useStore()

  return (
    <Fragment>
      {pipe(
        unclusteredSlugs,
        A.map((slug) => {
          const entry = slugEntries[slug][0]
          const { location, name } = entry
          const {
            geopoint: { lat, lng },
          } = location ?? { geopoint: { lat: 0, lng: 0 } }

          return (
            <Marker key={slug} longitude={lng} latitude={lat} anchor="center">
              <Link href={`/entry/${slug}`}>
                <a>
                  <div
                    className="marker absolute font-bold text-sm w-32"
                    style={{
                      transform: `translate(-50%, -50%)`,
                      fontFamily: "Inter",
                    }}
                    onClick={() => {
                      store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
                    }}
                  >
                    {/* <Chart
                      showLabels={false}
                      terms={entry?.terms}
                      patterns={patterns}
                      patternClasses={patternClasses}
                    /> */}
                    <div className="bg-white bg-opacity-75 font-extrabold p-1">
                      {name}
                    </div>
                  </div>
                </a>
              </Link>
            </Marker>
          )
        })
      )}
    </Fragment>
  )
}

export default Markers
