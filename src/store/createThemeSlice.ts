import {StateCreator} from 'zustand'

import {AppTheme} from '@react-navigation/native'

import {AppDarkTheme, AppLightTheme} from '~/core/resource/theme'

export type ThemeSlice = {
  theme: AppTheme
  useTheme: () => AppTheme
  toggleTheme: () => void
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  theme: AppLightTheme,
  useTheme: () => {
    return get().theme
  },
  toggleTheme: () => {
    set((state) => ({theme: state.theme.dark ? AppLightTheme : AppDarkTheme}))
  },
})
