import "server-only"
import React from "react"
import MapboxGlobe from "./MapboxGlobe"
import {
  getEntries,
  getPatternClasses,
  getPatterns,
} from "@/app/utils/sanity/queries"
import "mapbox-gl/dist/mapbox-gl.css"

const MapboxGlobeServerSide = async () => {
  const entries = await getEntries()
  const patterns = await getPatterns()
  const patternClasses = await getPatternClasses()

  return <MapboxGlobe {...{ entries, patternClasses, patterns }} />
}

export default MapboxGlobeServerSide
