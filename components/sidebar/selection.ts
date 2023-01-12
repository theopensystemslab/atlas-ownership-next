import { proxy, useSnapshot } from "valtio"

type SelectionStore = {
  patternNames: string[]
}

const selection = proxy<SelectionStore>({
  patternNames: [],
})

export const useSelection = () => useSnapshot(selection)

export default selection
