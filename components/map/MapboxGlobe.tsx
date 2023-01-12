import { trpc } from "@/lib/trpc"
import { pipe } from "fp-ts/lib/function"
import { none, some } from "fp-ts/lib/Option"
import { Feature, GeoJsonProperties, Geometry } from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRouter } from "next/router"
import React, { useCallback, useEffect } from "react"
import Map, {
  GeoJSONSource,
  Layer,
  LayerProps,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl"
import { ref } from "valtio"
import { A } from "../../lib/fp"
import store from "../../lib/store"

const MapboxGlobe = () => {
  const { data: entries = [] } = trpc.entries.useQuery()

  const router = useRouter()

  const handleRouteChange = useCallback(() => {
    if (router.asPath === "/") store.lastBirdseyeViewState = store.viewState
  }, [router.asPath])

  useEffect(() => {
    router.events.on("beforeHistoryChange", handleRouteChange)
    router.beforePopState((popstate) => {
      if (popstate.as === "/") store.map?.flyTo(store.lastBirdseyeViewState)
      return true
    })
    return () =>
      void router.events.off("beforeHistoryChange", handleRouteChange)
  }, [handleRouteChange, router, router.events])

  const features: Array<Feature<Geometry, GeoJsonProperties>> = pipe(
    entries,
    A.filterMap((entry) =>
      !entry.location?.geopoint
        ? none
        : some({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                entry.location.geopoint.lng,
                entry.location.geopoint.lat,
              ],
            },
            properties: {},
          })
    )
  )

  const sourceId = "entries"

  const clusterLayer: LayerProps = {
    id: "entryClusters",
    type: "circle",
    source: sourceId,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  }

  const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: sourceId,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  }

  const unclusteredPointLayer: LayerProps = {
    id: "unclustered-point",
    type: "circle",
    source: sourceId,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  }
  const onClick = (event: MapLayerMouseEvent) => {
    const feature: any = event?.features?.[0]
    if (!feature) return

    const clusterId: number | null | undefined = feature.properties?.cluster_id
    if (!clusterId) return

    const mapboxSource = store.map?.getSource(sourceId) as GeoJSONSource

    mapboxSource?.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return
      }

      store.map?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      })
    })
  }

  return (
    <Map
      ref={(mapRef) => {
        store.map = mapRef?.getMap() ? ref(mapRef.getMap()) : null
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!}
      initialViewState={store.viewState}
      interactiveLayerIds={[clusterLayer.id ?? ""]}
      projection={{ name: "globe" as any }}
      onMove={({ viewState }) => void (store.viewState = viewState)}
      reuseMaps
      onClick={onClick}
    >
      <Source
        id={sourceId}
        type={"geojson"}
        data={{
          type: "FeatureCollection",
          features,
        }}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  )
}

export default React.memo(MapboxGlobe)
