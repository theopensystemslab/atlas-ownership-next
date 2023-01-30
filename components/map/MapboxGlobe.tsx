import { trpc } from "@/lib/trpc"
import { pipe } from "fp-ts/lib/function"
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo } from "react"
import Map, {
  AttributionControl,
  GeoJSONSource,
  Layer,
  LayerProps,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl"
import { ref } from "valtio"
import { A, O, S } from "../../lib/fp"
import store from "../../lib/store"
import { Entry, TenureType } from "../../lib/types"
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

  const {
    patternNames: selectedPatternNames,
    entryType: selectedEntryTypes,
    tenureTypes: selectedTenureTypes,
  } = useSelection()

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

  const data = useMemo<FeatureCollection<Geometry, GeoJsonProperties>>(() => {
    const patternNameFilter = (entry: Entry) => {
      if (selectedPatternNames.length === 0) return true

      const isMatch = selectedPatternNames.reduce((acc, v) => {
        const entryPatternNames =
          entry.patterns?.map((pattern) => pattern.name) ?? []
        return acc && entryPatternNames.includes(v)
      }, true)
      return isMatch
    }

    const entryTypeFilter = (entry: Entry) => {
      if (!selectedEntryTypes) return true
      const isMatch = selectedEntryTypes === entry.type
      return isMatch
    }

    const tenureTypeFilter = (entry: Entry) => {
      if (selectedTenureTypes.length === 0) return true

      const isMatch = selectedTenureTypes.reduce((acc, v) => {
        const tenureTypes =
          entry.tenureType?.map((tenureType) => TenureType[tenureType]) ?? []
        return acc && tenureTypes.includes(v)
      }, true)
      return isMatch
    }

    const features: Feature<Geometry, GeoJsonProperties>[] = pipe(
      entries,
      A.filter(patternNameFilter),
      A.filter(entryTypeFilter),
      A.filter(tenureTypeFilter),
      A.filterMap(entryToFeature)
    )

    return {
      type: "FeatureCollection",
      features,
    }
  }, [entries, selectedPatternNames, selectedEntryTypes, selectedTenureTypes])

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
          ? O.some(feature.properties.slug as string)
          : O.none
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
      attributionControl={false}
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
      <AttributionControl position="bottom-left"/>
    </Map>
  )
}

export default React.memo(MapboxGlobe)
