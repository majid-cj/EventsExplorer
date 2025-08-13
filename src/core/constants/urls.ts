
import config from 'react-native-config'

const API_URL_CONFIG = `apikey=${config.API_KEY}&countryCode=${config.COUNTRY_CODE}`

export const URLS = {
  BASE: `https://app.ticketmaster.com/discovery/v2/`,
  SUGGESTIONS: () => `suggest?${API_URL_CONFIG}`,
  EVENTS: (keyword: string) => `events.json?${API_URL_CONFIG}&keyword=${keyword}`,
  DETAIL: (id: string) => `events/${id}.json?${API_URL_CONFIG}`,
}
