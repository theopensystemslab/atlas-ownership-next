import { trpc } from "@/lib/trpc"
import { pipe } from "fp-ts/lib/function"
import { none, some } from "fp-ts/lib/Option"
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Map, {
  GeoJSONSource,
  Layer,
  LayerProps,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl"
import { ref } from "valtio"
import { A, O, S } from "../../lib/fp"
import store from "../../lib/store"
<<<<<<< HEAD
import { Entry } from "../../lib/types"
=======
>>>>>>> 7d55d84 (wip first pass)
import { useSelection } from "../sidebar/selection"
import Markers from "./Markers"

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

<<<<<<< HEAD
  const { patternNames: selectedPatternNames } = useSelection()

  const entryToFeature = (entry: Entry): O.Option<Feature> =>
    !entry.location?.geopoint
      ? O.none
      : O.some({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              entry.location.geopoint.lng,
              entry.location.geopoint.lat,
            ],
          },
          properties: {
            slug: entry.slug?.current ?? null,
          },
        })
=======
  const { patternNames } = useSelection()
>>>>>>> 7d55d84 (wip first pass)

  const data = useMemo<FeatureCollection<Geometry, GeoJsonProperties>>(() => {
    const features: Array<Feature<Geometry, GeoJsonProperties>> = pipe(
      entries,
<<<<<<< HEAD
      A.filterMap((entry) => {
        if (selectedPatternNames.length === 0) return entryToFeature(entry)

        const match = selectedPatternNames.reduce((acc, v) => {
          const entryPatternNames =
            entry.patterns?.map((pattern) => pattern.name) ?? []
          return acc && entryPatternNames.includes(v)
        }, true)

        if (match) return entryToFeature(entry)
        else return O.none
      })
=======
      A.filter((entry) => {
        if (patternNames.length === 0) return true
        const patternNames2: string[] =
          entry.patterns?.map((pattern) => pattern.name) ?? []

        return patternNames.reduce((acc, v) => {
          const foo = patternNames2.includes(v)
          return acc && foo
        }, true)
      }),
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
              properties: {
                slug: entry.slug?.current ?? null,
              },
            })
      )
>>>>>>> 7d55d84 (wip first pass)
    )

    return {
      type: "FeatureCollection",
      features,
    }
<<<<<<< HEAD
  }, [entries, selectedPatternNames])
=======
  }, [entries, patternNames])
>>>>>>> 7d55d84 (wip first pass)

  const sourceId = "entries"

  const clusterLayer: LayerProps = {
    id: "entryClusters",
    type: "circle",
    source: sourceId,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "#ffffff",
      "circle-radius": 18,
    },
  }

  const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: sourceId,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      // "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  }

  const unclusteredPointLayer: LayerProps = {
    id: "unclustered-point",
    type: "circle",
    source: sourceId,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#fff",
      "circle-radius": 0,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#fff",
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

  const updateMarkers = () => {
    pipe(
      store.map?.querySourceFeatures(sourceId) ?? [],
      A.filterMap((feature) =>
        !feature.properties?.cluster && feature.properties?.slug
          ? some(feature.properties.slug as string)
          : none
      ),
      A.uniq(S.Eq),
      (unclustered) => {
        store.unclusteredSlugs = unclustered
      }
    )
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
      onMove={({ viewState }) => {
        store.viewState = viewState
      }}
      onRender={updateMarkers}
      onClick={onClick}
      reuseMaps
    >
      <Source
        id={sourceId}
        type={"geojson"}
        data={data}
        cluster={true}
        clusterMaxZoom={13}
        clusterRadius={150}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      <Markers entries={entries} />
    </Map>
  )
}

export default React.memo(MapboxGlobe)
