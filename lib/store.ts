import { MapboxMap, ViewState } from "react-map-gl"
import { proxy, useSnapshot } from "valtio"

type Store = {
  map: MapboxMap | null
  viewState: ViewState
}

const store = proxy<Store>({
  map: null,
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

export default store
