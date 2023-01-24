import { proxy, useSnapshot } from "valtio"

type SelectionStore = {
  patternNames: string[]
  entryTypes: string[]
  tenureTypes: string[]
}

const selection = proxy<SelectionStore>({
  patternNames: [],
  entryTypes: [],
  tenureTypes: [],
})

export const useSelection = () => useSnapshot(selection)

export default selection
