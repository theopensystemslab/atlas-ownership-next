import { pipe } from "fp-ts/lib/function"
import Link from "next/link"
import React, { Fragment } from "react"
import { A, NEA } from "../../lib/fp"
import store, { useStore } from "../../lib/store"
import { Entry } from "../../lib/types"
import Chart from "../Chart"
import { useState } from "react"
import { MapboxEvent, Marker as MapboxMarker, Popup } from "react-map-gl"
import { ArrowRight } from "@carbon/icons-react"
import { useGetEntryFromSlug } from "@/lib/queries"

type MarkersProps = {
  entries: Entry[]
}

type MarkerProps = {
  slug: string
  lat: number
  lng: number
}

const Marker = (props: MarkerProps) => {
  const { lat, lng, slug } = props

  const getEntry = useGetEntryFromSlug()
  const entry = getEntry(slug)

  const [showPopup, setShowPopup] = useState<boolean>(false)

  const onMarkerClick = (e: MapboxEvent<MouseEvent>) => {
    store.map?.flyTo({
      center: { lat, lng },
      padding: { top: 500, bottom: 0, left: 0, right: 0 },
      zoom: 18,
    })
    e.originalEvent.stopPropagation()
    setShowPopup(!showPopup)
  }

  const PopupContent = () => (
    <div className="w-[500px]">
      <h2 className="text-2xl">{entry?.name}</h2>
      <Chart
        rollupToPatternClass={true}
        showLabels={true}
        terms={entry?.terms}
      />
      <Link
        href={`/entry/${encodeURIComponent(slug)}`}
        className="flex justify-end items-center text-lg"
        legacyBehavior
      >
        <a>
          <div className="flex justify-end text-sm" onClick={() => setShowPopup(false)}>
            Find out more
            <ArrowRight className="ml-2" size={20} />
          </div>
        </a>
      </Link>
    </div>
  )

  return (
    <>
      <MapboxMarker
        key={slug}
        longitude={lng}
        latitude={lat}
        onClick={onMarkerClick}
      >
      <div className="bg-white rounded-full h-7 w-7 flex justify-center items-center">1</div>
      </MapboxMarker>
      {showPopup && (
        <Popup
          className="z-50 font-sans"
          longitude={lng}
          latitude={lat}
          maxWidth="none"
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <PopupContent />
        </Popup>
      )}
    </>
  )
}

const Markers = (props: MarkersProps) => {
  const { entries = [] } = props

  const slugEntries = pipe(
    entries,
    A.filter((x) => !!x.slug?.current),
    NEA.groupBy((entry) => {
      if (!entry.slug?.current) throw new Error("")
      else return entry.slug.current
    })
  )

  const { unclusteredSlugs } = useStore()

  return (
    <Fragment>
      {pipe(
        unclusteredSlugs,
        A.map((slug) => {
          const entry = slugEntries[slug][0]
          const {
            geopoint: { lat, lng },
          } = entry.location ?? { geopoint: { lat: 0, lng: 0 } }

          return <Marker key={slug} lat={lat} lng={lng} slug={slug} />
        })
      )}
    </Fragment>
  )
}

export default Markers
