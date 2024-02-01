import { MapboxMap, ViewState as ReactMapGLViewState } from "react-map-gl"
import { proxy, useSnapshot } from "valtio"

export type ViewState = Omit<ReactMapGLViewState, "padding">

type Store = {
  map: MapboxMap | null
  viewState: ViewState
  lastBirdseyeViewState: ViewState
  unclusteredSlugs: string[]
  isSidebarOpen: boolean
}

const initialViewState: ViewState = {
  latitude: 50,
  longitude: 4,
  zoom: 1.5,
  pitch: 0,
  bearing: 0,
}

const store = proxy<Store>({
  map: null,
  viewState: initialViewState,
  lastBirdseyeViewState: initialViewState,
  unclusteredSlugs: [],
  isSidebarOpen: false,
})

export const toggleSidebar = () => store.isSidebarOpen = !store.isSidebarOpen;

export const useStore = () => useSnapshot(store) as typeof store

export default store
