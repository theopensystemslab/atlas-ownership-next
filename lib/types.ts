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
  strength: IntensityRange
}

export type Pattern = {
  _id: string
  name: string
  description: string
  class: PatternClass
  entryCount?: number
  type: "right" | "obligation"
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

export type Tag = {
  label: string
  value: string
}

export type Entry = {
  _id?: string
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
  entryRating?: {
    grade: string
  }
  tags?: Tag[]
  type?: string
}

export enum TenureType {
  leasehold = "Leasehold",
  freehold = "Freehold",
  renting = "Renting",
  communityLandTrust = "Community Land Trust",
  other = "Other",
  collectiveOwnership = "Collective Ownership",
  indigenousRecognition = "Indigenous Recognition",
  commons = "Commons",
}

export type CarouselItem = Pick<Entry, "dates" | "location" | "name" | "slug">