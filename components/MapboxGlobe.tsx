import { pipe } from "fp-ts/lib/function"
import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Layer, Source } from "react-map-gl"
import { ref } from "valtio"
import { A, RA } from "../lib/fp"
import { testPolygons } from "../lib/mock"
import store, { useStore } from "../lib/store"
import GlobeEntry from "./GlobeEntry"

const MapboxGlobe = () => {
  const { entries } = useStore()

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
      ref={(mapRef) => {
        store.map = mapRef?.getMap() ? ref(mapRef.getMap()) : null
      }}
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
        RA.map((entry) => <GlobeEntry key={entry.slug.current} entry={entry} />)
      )}
    </Map>
  )
}

export default MapboxGlobe
