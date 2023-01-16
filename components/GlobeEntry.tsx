import Link from "next/link"
import { useState } from "react"
import { MapboxEvent, Marker, Popup } from "react-map-gl"
import { useGetEntryFromSlug } from "../lib/queries"
import store from "../lib/store"
import { trpc } from "../lib/trpc"
import { Entry } from "../lib/types"
import { Chart } from "./Chart"
import { ArrowRight } from "@carbon/icons-react"

type Props = {
  entry: Entry
}

const GlobeEntry = (props: Props) => {
  const {
    entry: { name, slug },
  } = props

  const { lat, lng } = props.entry.location!.geopoint

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const getEntry = useGetEntryFromSlug()
  const entry = getEntry(slug?.current)

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()

  const onMarkerClick = (e: MapboxEvent<MouseEvent>) => {
    store.map?.flyTo({ center: { lat, lng}, padding: { top: 500, bottom: 0, left: 0, right: 0 }, zoom: 18 });
    e.originalEvent.stopPropagation();
    setShowPopup(!showPopup);
  }

  const PopupContent = () => (
    <div className="w-[500px]">
      <h2 className="text-2xl">{name}</h2>
      <Chart 
        rollupToPatternClass={true} 
        showLabels={true} 
        terms={entry?.terms} 
        patterns={patterns} 
        patternClasses={patternClasses} 
      />
      <Link href={`/entry/${slug?.current}`}>
        <a className="flex justify-end items-center text-lg" onClick={() => setShowPopup(false)} >
          Find out more 
          <ArrowRight className="ml-2" size={20} />
        </a>
      </Link>
    </div>
  )

  return (
    <>
      <Marker key={slug?.current} longitude={lng} latitude={lat} onClick={onMarkerClick}></Marker>
      {
        showPopup &&
        <Popup
          className="z-50"
          longitude={lng} 
          latitude={lat} 
          maxWidth="none"
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <PopupContent />
        </Popup>
      }
    </>
  )
}

export default GlobeEntry
