"use client"
import "client-only"
import { Entry, Pattern, PatternClass } from "@/app/utils/sanity/types"
import store from "@/app/utils/store"
import Link from "next/link"
// import Chart from "../Chart"
import { getFormattedTenureTypes } from "@/app/utils/sanity/entry"
import { ArrowRight } from "@carbon/icons-react"
import { useState } from "react"
import { Marker as MapboxMarker, Popup } from "react-map-gl"
import MarkerChart from "./MarkerChart"
import _ from "lodash"
// import { useGetEntryFromSlug } from "@/lib/queries"
// import _ from "lodash"
// import { getFormattedTenureTypes } from "@/lib/entry"

type Props = {
  // slug: string
  entry: Entry
  patterns: Pattern[]
  patternClasses: PatternClass[]
  lat: number
  lng: number
}

const Marker = (props: Props) => {
  const { lat, lng, entry, patterns, patternClasses } = props

  const slug = entry.slug?.current ?? ""

  const [showPopup, setShowPopup] = useState<boolean>(false)

  const terms = entry.terms

  // Format the list of individual terms that apply to this entry
  let formattedTerms = _(terms)
    .map((term: any) => ({
      pattern: _.find(patterns, ["_id", term.pattern?._ref]),
      patternName: _.find(patterns, ["_id", term.pattern?._ref])?.name,
      type: _.capitalize(_.find(patterns, ["_id", term.pattern?._ref])?.type),
      strength: term.strength, // 1-5
      description: term.description,
      legalMechanisms: term.termLegalMechanisms?.map(
        (mechanism: Record<string, any>) => mechanism.name
      ),
    }))
    .map((term: any) => ({
      meta: term.pattern,
      name: term.patternName,
      patternClassName: _.find(patternClasses, [
        "_id",
        term.pattern?.class?._ref,
      ])?.name,
      patternClassOrder: _.find(patternClasses, [
        "_id",
        term.pattern?.class?._ref,
      ])?.order,
      patternIconUrl: term.pattern?.iconUrl,
      type: term.type === "Limitation" ? "Obligation" : term.type,
      strength: term.strength,
      description: term.description,
      legalMechanisms: term.legalMechanisms,
    }))
    .sortBy("patternClassOrder", "name")
    .value()
  // Rollup the individual terms by their pattern class
  let totalsByPatternClass = _(formattedTerms)
    .groupBy("patternClassName")
    .map((terms: any) => ({
      terms: terms,
      meta: _.find(patternClasses, ["_id", terms[0].meta?.class._ref]),
      name: terms[0].patternClassName,
      avgRights: _(terms).filter({ type: "Right" }).meanBy("strength"),
      avgObligations: _(terms)
        .filter({ type: "Obligation" })
        .meanBy("strength"),
    }))
    .sortBy("meta.order")
    .value()

  const PopupContent = () => (
    <div className="w-[320px] sm:w-[500px]">
      <h2 className="text-lg sm:text-xl">{entry?.name}</h2>
      <span className="text-base">
        {getFormattedTenureTypes(entry?.tenureType)}
      </span>
      {entry.terms?.length && (
        <MarkerChart showLabels={true} data={totalsByPatternClass} />
      )}
      <Link
        href={`/entry/${encodeURIComponent(slug)}`}
        className="flex justify-end items-center"
        legacyBehavior
      >
        <a>
          <div
            className="flex justify-end text-sm mt-3"
            onClick={() => setShowPopup(false)}
          >
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
        onClick={(e) => {
          store.map?.flyTo({
            center: { lat, lng },
            padding: { top: 500, bottom: 0, left: 0, right: 0 },
            zoom: 18,
          })
          e.originalEvent.stopPropagation()
          setShowPopup(!showPopup)
        }}
      >
        <div className="bg-white text-black rounded-full h-7 w-7 flex justify-center items-center">
          1
        </div>
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

export default Marker
