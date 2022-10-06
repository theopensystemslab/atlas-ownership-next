import { Marker } from "react-map-gl"
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

  return (
    <Marker key={slug.current} longitude={lng} latitude={lat}>
      <Button
        className="marker  absolute bg-pink-500"
        onClick={() => {
          store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
        }}
      >
        {name}
      </Button>
    </Marker>
  )
}

export default GlobeEntry
