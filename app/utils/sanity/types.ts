import { PortableTextBlock } from "@portabletext/types"

export type Geopoint = {
  lat: number
  lng: number
}

export type Location = {
  geopoint: Geopoint
  region: string
}

export type IntensityRange = 0 | 1 | 2 | 3 | 4 | 5

export type Term = {
  description: string
  pattern: Pattern
  rightsIntensity?: IntensityRange
  obligationIntensity?: IntensityRange
  strength: IntensityRange
  termLegalMechanisms: Record<string, any>
}

export type Pattern = {
  _id: string
  _ref: string
  name: string
  description: string
  class: PatternClass
  entryCount?: number
  type: "right" | "obligation"
  iconUrl?: string
}

export type PatternClass = {
  _ref: string
  name: string
  description: string
  order: number
  color: {
    hex: string
  }
}

export type PatternInfo = {
  name: string
  rights: Pattern[]
  obligations: Pattern[]
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
  content?: PortableTextBlock[]
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
  terms?: Term[]
  patterns?: Pattern[]
  tenureType?: Array<keyof typeof TenureType>
  entryRating?: {
    grade: string
  }
  tags?: Tag[]
  type?: string
}

export enum TenureType {
  leasehold = "Leasehold",
  freehold = "Freehold",
  communityLandTrust = "Community land trust",
  renting = "Renting",
  collectiveOwnership = "Collective ownership",
  indigenousRecognition = "Indigenous recognition",
  commons = "Commons",
  other = "Other",
}

export type CarouselEntry = Pick<Entry, "dates" | "location" | "name" | "slug">

export type EntryType = {
  title: string
  value: string
}

export type Page = {
  slug?: string
  title?: string
  content?: any[]
}
