import { pipe } from "fp-ts/lib/function"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRef } from "react"
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl"
import { A, RA } from "../lib/fp"
import { testPolygons } from "../lib/mock"
import { Entry } from "../lib/types"
import Button from "./Button"

type Props = {
  entries: Entry[]
}

const Mapbox = (props: Props) => {
  const { entries } = props
  const mapRef = useRef<MapRef>(null)

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!}
      initialViewState={{
        latitude: 50,
        longitude: 4,
        zoom: 1.5,
      }}
      projection={{ name: "globe" as any }}
      ref={mapRef}
    >
      <Source
        id={`entryPolygons`}
        type="geojson"
        data={{
          // geometry: { type: "Polygon", coordinates: [coords] },
          type: "FeatureCollection",
          features: pipe(
            testPolygons,
            A.map((coords) => ({
              geometry: {
                type: "Polygon",
                coordinates: [coords],
              },
              properties: {},
              type: "Feature",
            }))
          ),
        }}
      >
        <Layer
          id="foo"
          type="fill"
          source="entryPolygons"
          paint={{
            "fill-color": "#4E3FC8",
          }}
        />
      </Source>
      {pipe(
        entries,
        RA.filter((entry) => !!entry.location.geopoint),
        RA.map(
          ({
            location: {
              geopoint: { lat, lng },
              region,
            },
            slug,
          }) => (
            <Marker
              key={slug.current}
              longitude={lng}
              latitude={lat}
              anchor="bottom"
            >
              <Button
                className="marker w-8 h-8 absolute bg-pink-500"
                onClick={() => {
                  mapRef.current
                    ?.getMap()
                    .flyTo({ center: { lat, lng }, zoom: 18 })
                }}
              >
                {region}
              </Button>
            </Marker>
          )
        )
      )}
    </Map>
  )
}

export default Mapbox
