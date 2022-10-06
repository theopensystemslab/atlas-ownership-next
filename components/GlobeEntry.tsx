import { useEffect, useState } from "react"
import { Marker } from "react-map-gl"
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

  useEffect(
    () =>
      subscribeKey(store, "viewState", () => {
        const { latitude, longitude, zoom } = store.viewState
        const dx = abs(lat - latitude)
        const dy = abs(lng - longitude)
        const d = hypot(dx, dy) * (1 / zoom)

        if (markerState > 0 && d > 1) setMarkerState(0)
        if (markerState < 1 && d < 1) setMarkerState(1)
      }),
    [lat, lng, markerState]
  )

  return (
    <Marker key={slug.current} longitude={lng} latitude={lat} anchor="center">
      {markerState === 0 ? (
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
