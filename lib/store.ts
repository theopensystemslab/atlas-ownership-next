import { pipe } from "fp-ts/lib/function"
import { useRouter } from "next/router"
import { MapboxMap, ViewState } from "react-map-gl"
import { proxy, useSnapshot } from "valtio"
import { O, RA } from "./fp"
import { Entry, Pattern, PatternClass } from "./types"

type Store = {
  map: MapboxMap | null
  entries: Entry[]
  patterns: Pattern[]
  patternClasses: PatternClass[]
  viewState: ViewState
}

const store = proxy<Store>({
  map: null,
  entries: [],
  patterns: [],
  patternClasses: [],
  viewState: {
    latitude: 50,
    longitude: 4,
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
})

export const useStore = () => useSnapshot(store) as typeof store

export const useEntry = () => {
  const { entries } = useStore()
  const router = useRouter()
  return pipe(
    entries,
    RA.findFirst((entry) => entry.slug.current === router.query.slug),
    O.toNullable
  )
}

export default store
