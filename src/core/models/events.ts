interface Image {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
  attribution?: string
}

interface PublicSale {
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
  public: PublicSale
  presales?: Presale[]
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

interface SelfLink {
  href: string
}

interface EventLinks {
  self: SelfLink
  attractions: SelfLink[]
  venues: SelfLink[]
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

interface ADA {
  adaPhones: string
  adaCustomCopy: string
  adaHours: string
}

interface UpcomingEvents {
  archtics?: number
  tmr?: number
  ticketmaster: number
  _total: number
  _filtered: number
}

interface VenueLinks {
  self: SelfLink
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
  ada: ADA
  _links: VenueLinks
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
  upcomingEvents: UpcomingEvents
  _links: VenueLinks
}

interface Embedded {
  venues: Venue[]
  attractions: Attraction[]
}

interface PageLinks {
  href: string
}

interface Page {
  first: PageLinks
  self: PageLinks
  next: PageLinks
  last: PageLinks
}

interface Pagination {
  size: number
  totalElements: number
  totalPages: number
  number: number
}

interface Event {
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
  _links: EventLinks
  _embedded: Embedded
}

interface TopLevelEmbedded {
  events: Event[]
}

export interface Events {
  _embedded: TopLevelEmbedded
  _links: Page
  page: Pagination
}
