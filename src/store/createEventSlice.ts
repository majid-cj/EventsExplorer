import {StateCreator} from 'zustand'
import {Events, Suggestion, Event} from '~/core/models'
import {axiosInstance} from '~/core/network'
import {URLS} from '~/core/constants'

type EventsPayload = {
  loading: boolean
  error: any
  data: Events | undefined
}

type SuggestionPayload = {
  loading: boolean
  error: any
  data: Suggestion | undefined
}

type EventPayload = {
  loading: boolean
  error: any
  data: Event | undefined
}

type FavoriteEventsPayload = {
  loading: boolean
  error: any
  data: Event[]
}

export type EventSlice = {
  suggestions: SuggestionPayload
  eventList: EventsPayload
  event: EventPayload
  favoriteEvents: FavoriteEventsPayload
  favorites: Array<string>

  getSuggestedEvents: () => Promise<void>
  getEventsList: (keyword: string) => Promise<void>
  getEventDetail: (id: string) => Promise<Event | null>
  getFavoriteEvents: () => Promise<void>
  toggleFavorite: (event: Event) => void
  eventToggled: (id: string) => boolean
  clearFavorites: () => void

  resetAppState: () => void
}

export const createEventSlice: StateCreator<EventSlice> = (set, get) => ({
  suggestions: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  eventList: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  event: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  favoriteEvents: {
    data: [],
    error: undefined,
    loading: false,
  },
  favorites: [],

  async getSuggestedEvents() {
    set(() => ({suggestions: {data: undefined, error: undefined, loading: true}}))
    try {
      const response = await axiosInstance.get(URLS.SUGGESTIONS())
      set(() => ({
        suggestions: {
          data: response.data,
          error: undefined,
          loading: false,
        },
      }))
    } catch (error) {
      set(() => ({suggestions: {data: undefined, error, loading: false}}))
    }
  },

  async getEventsList(keyword) {
    set(() => ({eventList: {data: undefined, error: undefined, loading: true}}))
    try {
      const response = await axiosInstance.get(URLS.EVENTS(keyword))
      set(() => ({
        eventList: {
          data: response.data,
          error: undefined,
          loading: false,
        },
      }))
    } catch (error) {
      set(() => ({eventList: {data: undefined, error, loading: false}}))
    }
  },

  async getEventDetail(id) {
    set(() => ({event: {data: undefined, error: undefined, loading: true}}))
    try {
      const response = await axiosInstance.get(URLS.DETAIL(id))
      const eventData = response.data as Event
      set(() => ({
        event: {
          data: eventData,
          error: undefined,
          loading: false,
        },
      }))
      return eventData
    } catch (error) {
      set(() => ({event: {data: undefined, error, loading: false}}))
      return null
    }
  },
  async getFavoriteEvents() {
    const favoriteIds = get().favorites
    const currentFavoriteEvents = get().favoriteEvents
    if (currentFavoriteEvents.loading || favoriteIds.length === 0) {
      if (favoriteIds.length === 0) {
        set(() => ({
          favoriteEvents: {
            data: [],
            error: undefined,
            loading: false,
          },
        }))
      }
      return
    }
    set(() => ({
      favoriteEvents: {
        ...currentFavoriteEvents,
        loading: true,
        error: undefined,
      },
    }))
    try {
      const eventPromises = favoriteIds.map(async (eventId) => {
        try {
          const response = await axiosInstance.get(URLS.DETAIL(eventId))
          return response.data as Event
        } catch {
          return null
        }
      })
      const events = await Promise.all(eventPromises)
      const validEvents = events.filter(Boolean) as Event[]
      const validEventIds = validEvents.map((event) => event.id)
      const cleanedFavorites = favoriteIds.filter((id) => validEventIds.includes(id))
      set(() => ({
        favoriteEvents: {
          data: validEvents,
          error: undefined,
          loading: false,
        },
        favorites: cleanedFavorites,
      }))
    } catch (error) {
      set(() => ({
        favoriteEvents: {
          data: get().favoriteEvents.data,
          error,
          loading: false,
        },
      }))
    }
  },
  toggleFavorite(event) {
    const list = get().favorites
    const exist = list.some((item) => item === event.id)
    const newFavorites = exist ? list.filter((item) => item !== event.id) : [...list, event.id]

    set(() => ({
      favorites: newFavorites,
    }))

    if (exist) {
      const currentData = get().favoriteEvents.data
      set(() => ({
        favoriteEvents: {
          ...get().favoriteEvents,
          data: currentData.filter((favEvent) => favEvent.id !== event.id),
        },
      }))
    } else {
      const currentData = get().favoriteEvents.data
      set(() => ({
        favoriteEvents: {
          ...get().favoriteEvents,
          data: [...currentData, event],
        },
      }))
    }
  },
  eventToggled(id) {
    return get().favorites.some((item) => item === id)
  },
  clearFavorites() {
    set(() => ({
      favorites: [],
      favoriteEvents: {
        data: [],
        error: undefined,
        loading: false,
      },
    }))
  },
  resetAppState() {
    set(() => ({
      favorites: [],
      favoriteEvents: {
        data: [],
        error: undefined,
        loading: false,
      },
      suggestions: {
        data: undefined,
        error: undefined,
        loading: false,
      },
      eventList: {
        data: undefined,
        error: undefined,
        loading: false,
      },
      event: {
        data: undefined,
        error: undefined,
        loading: false,
      },
    }))
  },
})
