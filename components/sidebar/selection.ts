import { TenureType } from "@/lib/types"
import { proxy, useSnapshot } from "valtio"

type SelectionStore = {
  patternNames: string[]
  entryType: string | undefined
  tenureTypes: TenureType[]
}

const selection = proxy<SelectionStore>({
  patternNames: [],
  entryType: undefined,
  tenureTypes: [],
})

export const useSelection = () => useSnapshot(selection)

export default selection
