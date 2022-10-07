import { pipe } from "fp-ts/lib/function"
import "mapbox-gl/dist/mapbox-gl.css"
import React from "react"
import Map, { Layer, Source } from "react-map-gl"
import { ref } from "valtio"
import { A } from "../lib/fp"
import { testPolygons } from "../lib/mock"
import store from "../lib/store"
import GlobeChildren from "./GlobeChildren"

const MapboxGlobe = () => {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!}
      initialViewState={store.viewState}
      projection={{ name: "globe" as any }}
      ref={(mapRef) => {
        store.map = mapRef?.getMap() ? ref(mapRef.getMap()) : null
      }}
      onMove={({ viewState }) => void (store.viewState = viewState)}
      reuseMaps
    >
      <Source
        id={`entryPolygons`}
        type="geojson"
        data={{
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
      <GlobeChildren />
    </Map>
  )
}

export default React.memo(MapboxGlobe)
