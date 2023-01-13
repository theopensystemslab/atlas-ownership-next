export type Geopoint = {
  lat: number
  lng: number
}

export type Location = {
  geopoint: Geopoint
  region: string
}

export type IntensityRange = 0|1|2|3|4|5

export type Term = {
  description: string
  pattern: Pattern
  rightsIntensity?: IntensityRange
  obligationIntensity?: IntensityRange
}

export type Pattern = {
  name: string
  description: string
  class: PatternClass
  entryCount?: number
}

export type PatternClass = {
  name: string
  description: string
  order: number
  color: {
    hex: string
  }
}

export type Reference = {
  name: string
  link: string
  source: string
  _key: string
}

export type Entry = {
  name?: string
  description?: string
  location?: Location
  dates?: {
    start?: string
    end?: string
  }
  mainImage?: {
    source?: string
    credit?: string
    file?: {
      asset?: {
        url?: string
      }
    }
  }
  references?: Reference[]
  slug?: {
    current: string
  }
  terms?: Term[],
  tenureType?: Array<keyof typeof TenureType>;
}

export enum TenureType {
  leasehold = "Leasehold",
  freehold = "Freehold",
  renting = "Renting",
  communityLandTrust = "Community Land Trust",
  other = "Other",
}