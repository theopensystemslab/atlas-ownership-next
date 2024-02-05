import { Entry, TenureType } from "./types"

const formatYear = (year: number): string =>
  year < 0 ? `${Math.abs(year)} BCE` : year.toString()

export const getFormattedEntryDates = (dates?: {
  startYear?: number
  endYear?: number
}): string => {
  if (dates?.startYear !== null && typeof dates?.startYear !== "undefined") {
    const startYearFormatted = formatYear(dates.startYear)
    const endYearFormatted =
      dates.endYear !== null && typeof dates.endYear !== "undefined"
        ? formatYear(dates.endYear)
        : "Present"
    return `${startYearFormatted} - ${endYearFormatted}`
  } else {
    return "Unknown dates"
  }
}

export const getFormattedTenureTypes = (
  tenureType?: Entry["tenureType"]
): string =>
  tenureType
    ? tenureType.map((type) => TenureType[type]).join(", ")
    : "Unknown tenure type"
