import { A } from "@/lib/fp"
import store from "@/lib/store"
import { trpc } from "@/lib/trpc"
import { pipe } from "fp-ts/lib/function"
import { none, some } from "fp-ts/lib/Option"
import { Feature, GeoJsonProperties, Geometry } from "geojson"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { Layer, LayerProps, Source, SourceProps } from "react-map-gl"

const EntryCircles = () => {
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
            properties: {
              title: "Mapbox DC",
            },
          })
    )
  )

  const sourceProps: SourceProps = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features,
    },
  }

  const layerProps: LayerProps = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  }

  return (
    <Source {...sourceProps}>
      <Layer {...layerProps} />
    </Source>
  )
}

export default EntryCircles
