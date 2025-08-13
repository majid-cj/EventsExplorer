interface Image {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
  attribution?: string
}

interface Public {
  startDateTime: string
  startTBD: boolean
  startTBA: boolean
  endDateTime: string
}

interface Presale {
  startDateTime: string
  endDateTime: string
  name: string
}

interface Sales {
  public: Public
  presales: Presale[]
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
  type: Type
  subType: SubType
  family: boolean
}

interface Promoter {
  id: string
  name: string
  description: string
}

interface Seatmap {
  staticUrl: string
  id: string
}

interface Accessibility {
  info: string
  ticketLimit: number
  id: string
}

interface TicketLimit {
  info: string
  id: string
}

interface AgeRestrictions {
  legalAgeEnforced: boolean
  id: string
}

interface SafeTix {
  enabled: boolean
}

interface AllInclusivePricing {
  enabled: boolean
}

interface Ticketing {
  safeTix: SafeTix
  allInclusivePricing: AllInclusivePricing
  id: string
}

interface Self {
  href: string
}

interface Links {
  self: Self
  attractions: Self[]
  venues: Self[]
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

interface Address {
  line1: string
}

interface Location {
  longitude: string
  latitude: string
}

interface Market {
  name: string
  id: string
}

interface DMA {
  id: number
}

interface BoxOfficeInfo {
  openHoursDetail: string
}

interface ParkingDetail {}

interface UpcomingEvents {
  archtics: number
  tmr: number
  ticketmaster: number
  _total: number
  _filtered: number
}

interface Ada {
  adaPhones: string
  adaCustomCopy: string
  adaHours: string
}

interface Venue {
  name: string
  type: string
  id: string
  test: boolean
  url: string
  locale: string
  images: Image[]
  postalCode: string
  timezone: string
  city: City
  state: State
  country: Country
  address: Address
  location: Location
  markets: Market[]
  dmas: DMA[]
  boxOfficeInfo: BoxOfficeInfo
  parkingDetail: string
  upcomingEvents: UpcomingEvents
  ada: Ada
  _links: {self: Self}
}

interface ExternalLink {
  url: string
}

interface ExternalLinks {
  twitter: ExternalLink[]
  facebook: ExternalLink[]
  wiki: ExternalLink[]
  instagram: ExternalLink[]
  homepage: ExternalLink[]
}

interface AttractionUpcomingEvents {
  tmr: number
  ticketmaster: number
  _total: number
  _filtered: number
}

interface Attraction {
  name: string
  type: string
  id: string
  test: boolean
  url: string
  locale: string
  externalLinks: ExternalLinks
  images: Image[]
  classifications: Classification[]
  upcomingEvents: AttractionUpcomingEvents
  _links: {self: Self}
}

interface Embedded {
  venues: Venue[]
  attractions: Attraction[]
}

export interface Event {
  name: string
  type: string
  id: string
  test: boolean
  url: string
  locale: string
  images: Image[]
  sales: Sales
  dates: Dates
  classifications: Classification[]
  promoter: Promoter
  promoters: Promoter[]
  info: string
  pleaseNote: string
  seatmap: Seatmap
  accessibility: Accessibility
  ticketLimit: TicketLimit
  ageRestrictions: AgeRestrictions
  ticketing: Ticketing
  _links: Links
  _embedded: Embedded
}
