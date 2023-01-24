import { proxy, useSnapshot } from "valtio"

type SelectionStore = {
  patternNames: string[]
  entryTypes: string[]
}

const selection = proxy<SelectionStore>({
  patternNames: [],
  entryTypes: [],
})

export const useSelection = () => useSnapshot(selection)

export default selection
