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
  rightsIntensity?: IntensityRange
  obligationIntensity?: IntensityRange
}

export type Reference = {
  name: string
  link: string
  source: string
}

export type Entry = {
  name: string
  description: string
  location: Location
  dates: {
    start: string
    end?: string
  }
  mainImage: {
    source: string
    credit: string
  }
  references: Reference[]
  slug: {
    current: string
  }
  terms: Term[]
}
