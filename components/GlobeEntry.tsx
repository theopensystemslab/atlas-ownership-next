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

type Props = {
  entry: Entry
}

const GlobeEntry = (props: Props) => {
  const {
    entry: { name, slug },
  } = props

  const { lat, lng } = props.entry.location!.geopoint

  const [markerState, setMarkerState] = useState<number>(0)
  const [debouncedMarkerState] = useDebounce(markerState, 50)

  const zoomThreshold = 4

  const deltaThreshold1 = 11
  const deltaThreshold2 = 3

  const getEntry = useGetEntryFromSlug()
  const entry = getEntry(slug?.current)

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClassesError } =
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
          case d >= deltaThreshold1:
            setMarkerState(0)
            break
          case d < deltaThreshold1 && d >= deltaThreshold2:
            setMarkerState(1)
            break
          case d < deltaThreshold2:
            setMarkerState(2)
            break
        }
      }),
    [debouncedMarkerState, lat, lng, markerState]
  )

  return (
    <Marker key={slug?.current} longitude={lng} latitude={lat} anchor="center">
      {debouncedMarkerState === 0 ? (
        <Link href={`/entry/${slug?.current}`}>
          <a>
            <div className="marker absolute bg-white w-2 h-2 rounded-full" />
          </a>
        </Link>
      ) : debouncedMarkerState === 1 ? (
        <Link href={`/entry/${slug?.current}`}>
          <a>
            <div
              style={{
                transform: `translate(-50%, -50%)`,
                fontFamily: "Inter",
              }}
              className="marker absolute bg-white bg-opacity-75 p-1 text-sm font-bold"
              onClick={() => {
                store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
              }}
            >
              {name}
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/entry/${slug?.current}`}>
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
              <div className="bg-white bg-opacity-75 font-extrabold p-1">
                {name}
              </div>
            </div>
          </a>
        </Link>
      )}
    </Marker>
  )
}

export default GlobeEntry
