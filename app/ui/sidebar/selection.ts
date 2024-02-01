import "client-only"
import { EntryType, Pattern, TenureType } from "@/app/utils/sanity/types"
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

export const selectPattern = (pattern: Pattern): void => {
  if (!selection.patternNames.includes(pattern.name)) {
    selection.patternNames.push(pattern.name)
  }
}

export const deselectPattern = (pattern: Pattern): void => {
  selection.patternNames = selection.patternNames.filter(
    (x) => x !== pattern.name
  )
}

export const selectEntryType = (entryType: EntryType): void => {
  selection.entryType = entryType.value
}

export const deselectEntryType = (): void => {
  selection.entryType = undefined
}

export const selectTenureType = (tenureType: TenureType): void => {
  if (!selection.tenureTypes.includes(tenureType)) {
    selection.tenureTypes.push(tenureType)
  }
}

export const deselectTenureType = (tenureType: TenureType): void => {
  selection.tenureTypes = selection.tenureTypes.filter((x) => x !== tenureType)
}

export const isSelectionEmpty = (): boolean => {
  const { patternNames, entryType, tenureTypes } = selection
  return !patternNames.length && !entryType && !tenureTypes.length
}

export const deselectAll = (): void => {
  selection.patternNames = []
  selection.entryType = undefined
  selection.tenureTypes = []
}

export const useSelection = () => useSnapshot(selection)
