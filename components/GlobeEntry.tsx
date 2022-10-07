import Link from "next/link"
import { useEffect, useState } from "react"
import { Marker } from "react-map-gl"
import { useDebounce } from "use-debounce"
import { subscribeKey } from "valtio/utils"
import { hypot } from "../lib/fp"
import { useGetEntryFromSlug } from "../lib/queries"
import store from "../lib/store"
import { trpc } from "../lib/trpc"
import { Entry } from "../lib/types"
import Chart from "./Chart"

type Props = {
  entry: Entry
}

const GlobeEntry = (props: Props) => {
  const {
    entry: {
      name,
      location: {
        geopoint: { lat, lng },
      },
      slug,
    },
  } = props

  const [markerState, setMarkerState] = useState<number>(0)
  const [debouncedMarkerState] = useDebounce(markerState, 100)

  const zoomThreshold = 4
  const deltaThreshold1 = 11
  const deltaThreshold2 = 8

  const getEntry = useGetEntryFromSlug()
  const entry = getEntry(slug.current)

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClaassesError } =
    trpc.patternClasses.useQuery()

  useEffect(
    () =>
      subscribeKey(store, "viewState", () => {
        const { latitude, longitude, zoom } = store.viewState
        if (zoom < zoomThreshold) {
          if (debouncedMarkerState !== 0) setMarkerState(0)
          return
        }

        const dx = lat - latitude
        const dy = lng - longitude
        const d = hypot(dx, dy) * zoom

        switch (true) {
          case debouncedMarkerState === 0 && d <= deltaThreshold1:
            setMarkerState(1)
            break
          case debouncedMarkerState === 1 && d > deltaThreshold1:
            setMarkerState(0)
            break
          case debouncedMarkerState === 2 && d > deltaThreshold2:
            setMarkerState(2)
            break
        }
      }),
    [debouncedMarkerState, lat, lng, markerState]
  )

  return (
    <Marker key={slug.current} longitude={lng} latitude={lat} anchor="center">
      {debouncedMarkerState === 0 ? (
        <Link href={`/entry/${slug.current}`}>
          <a>
            <div className="marker absolute bg-white rounded-full w-2 h-2" />
          </a>
        </Link>
      ) : debouncedMarkerState === 1 ? (
        <Link href={`/entry/${slug.current}`}>
          <a>
            <div
              className="marker absolute w-64 text-white font-extrabold text-xl"
              onClick={() => {
                store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
              }}
            >
              <Chart
                showLabels={false}
                terms={entry?.terms}
                patterns={patterns}
                patternClasses={patternClasses}
              />
              {name}
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/entry/${slug.current}`}>
          <a>
            <div
              className="marker absolute bg-pink-500"
              onClick={() => {
                store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
              }}
            >
              {name}
            </div>
          </a>
        </Link>
      )}
    </Marker>
  )
}

export default GlobeEntry
