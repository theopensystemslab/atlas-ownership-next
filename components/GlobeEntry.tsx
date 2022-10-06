import { useEffect, useState } from "react"
import { Marker } from "react-map-gl"
import { useDebounce, useDebouncedCallback } from "use-debounce"
import { subscribeKey } from "valtio/utils"
import { abs, hypot } from "../lib/fp"
import store from "../lib/store"
import { Entry } from "../lib/types"
import Button from "./Button"

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

  const zoomThreshold = 5
  const deltaThreshold1 = 15

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
        }
      }),
    [debouncedMarkerState, lat, lng, markerState]
  )

  return (
    <Marker key={slug.current} longitude={lng} latitude={lat} anchor="center">
      {debouncedMarkerState === 0 ? (
        <Button
          className="marker  absolute bg-white rounded-full w-2 h-2"
          onClick={() => {
            store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
          }}
        />
      ) : (
        <Button
          className="marker absolute bg-pink-500"
          onClick={() => {
            store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
          }}
        >
          {name}
        </Button>
      )}
    </Marker>
  )
}

export default GlobeEntry
