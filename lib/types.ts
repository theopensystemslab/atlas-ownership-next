export type Geopoint = {
  lat: number
  lng: number
}

export type Location = {
  geopoint: Geopoint
  region: string
}

export type Entry = {
  location: Location
  slug: {
    current: string
  }
}
