interface Image {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
  attribution?: string
}

interface City {
  name: string
}

interface State {
  name: string
  stateCode: string
}

interface Country {
  name: string
  countryCode: string
}

interface Address {}

interface Location {
  longitude: string
  latitude: string
}

interface UpcomingEvents {
  archtics?: number
  ticketmaster?: number
  tmr?: number
  _total: number
  _filtered: number
}

interface SelfLink {
  href: string
}

interface Links {
  self: SelfLink
}

interface ExternalLink {
  url: string
}

interface ExternalLinks {
  twitter?: ExternalLink[]
  facebook?: ExternalLink[]
  wiki?: ExternalLink[]
  instagram?: ExternalLink[]
  homepage?: ExternalLink[]
  youtube?: ExternalLink[]
  itunes?: ExternalLink[]
  lastfm?: ExternalLink[]
  spotify?: ExternalLink[]
  musicbrainz?: {id: string; url: string}[]
}

interface Segment {
  id: string
  name: string
}

interface Genre {
  id: string
  name: string
}

interface SubGenre {
  id: string
  name: string
}

interface Type {
  id: string
  name: string
}

interface SubType {
  id: string
  name: string
}

interface Classification {
  primary: boolean
  segment: Segment
  genre: Genre
  subGenre: SubGenre
  type?: Type
  subType?: SubType
  family: boolean
}

interface Venue {
  name: string
  type: string
  id: string
  url: string
  locale: string
  images?: Image[]
  timezone: string
  city: City
  state: State
  country: Country
  address: Address
  location: Location
  upcomingEvents: UpcomingEvents
  _links: Links
  aliases?: string[]
  parkingDetail?: string
}

interface Attraction {
  name: string
  type: string
  id: string
  url: string
  locale: string
  externalLinks?: ExternalLinks
  aliases?: string[]
  images: Image[]
  classifications: Classification[]
  upcomingEvents: UpcomingEvents
  _links: Links
}

interface Start {
  localDate: string
  localTime: string
  dateTime: string
  dateTBD: boolean
  dateTBA: boolean
  timeTBA: boolean
  noSpecificTime: boolean
}

interface Status {
  code: string
}

interface Dates {
  start: Start
  timezone: string
  status: Status
  spanMultipleDays: boolean
}

interface EventLinks {
  self: SelfLink
  attractions: SelfLink[]
  venues: SelfLink[]
}

interface Embedded {
  venues: Venue[]
  attractions: Attraction[]
}

interface Event {
  name: string
  type: string
  id: string
  url: string
  locale: string
  images: Image[]
  dates: Dates
  classifications: Classification[]
  location: Location
  _links: EventLinks
  _embedded: Embedded
}

interface Product extends Event {}

interface TopLevelLinks {
  self: SelfLink
}

interface TopLevelEmbedded {
  venues: Venue[]
  attractions: Attraction[]
  events: Event[]
  products: Product[]
}

export interface Suggestion {
  _links: TopLevelLinks
  _embedded: TopLevelEmbedded
}
