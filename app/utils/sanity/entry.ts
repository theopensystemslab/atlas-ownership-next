import { Entry, TenureType } from "./types"

export const getFormattedEntryDates = (dates?: Entry["dates"]): string =>
  dates?.start
    ? new Date(Date.parse(dates.start)).getFullYear() +
      " - " +
      (dates.end ? new Date(Date.parse(dates.end)).getFullYear() : "")
    : "Unknown dates"

export const getFormattedTenureTypes = (
  tenureType?: Entry["tenureType"]
): string =>
  tenureType
    ? tenureType.map((type) => TenureType[type]).join(", ")
    : "Unknown tenure type"
