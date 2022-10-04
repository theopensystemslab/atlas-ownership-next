import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useState } from "react"
import { Entry } from "../lib/types"
import * as ReactDOM from "react-dom"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
type Props = {
  entries: Entry[]
}

const Mapbox = (props: Props) => {
  const { entries } = props
  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapElement) return

    const map = new mapboxgl.Map({
      container: mapElement,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
      zoom: 1.5,
      center: [30, 50],
      projection: {
        name: "globe",
      },
    })

    map.on("load", () => {
      // Set the default atmosphere style
      // map.setFog({})

      for (const entry of entries) {
        if (!entry.location.geopoint) continue
        // Create a DOM element for each marker.
        const el = document.createElement("div")
        el.className = "marker"
        const size = 50
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.className = "bg-pink-500 absolute"

        // Add a popup displayed on click for each marker
        const popup = new mapboxgl.Popup({ offset: 25 })

        popup.setHTML(
          `<a href="/entry/${entry.slug.current}"><h2>${entry.location.region}</h2></a>`
        )

        // entry.slug.current

        const { lat, lng } = entry.location.geopoint

        // Add markers to the map.
        new mapboxgl.Marker(el, {
          rotationAlignment: "map",
          offset: [0, -size / 2],
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map)
      }
    })
  }, [entries, mapElement])

  return <div ref={setMapElement} className="relative h-full w-full" />
}

export default Mapbox
