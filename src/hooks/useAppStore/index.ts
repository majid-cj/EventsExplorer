import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import {
  createEventSlice,
  createThemeSlice,
  createUtilitySlice,
  ThemeSlice,
  UtilitySlice,
  EventSlice,
  zustandStorage,
} from '~/store'

const useAppStore = create<ThemeSlice & UtilitySlice & EventSlice>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createUtilitySlice(...args),
      ...createEventSlice(...args),
    }),
    {
      name: 'event-explorer',
      storage: createJSONStorage(() => zustandStorage),
      version: 1.0,
    }
  )
)

export default useAppStore
