import { MapboxMap } from "react-map-gl"
import { proxy, useSnapshot } from "valtio"
import { Entry } from "./types"

type Store = {
  map: MapboxMap | null
  entries: Entry[]
}

const store = proxy<Store>({
  map: null,
  entries: [],
})

export const useStore = () => useSnapshot(store) as typeof store

export default store
