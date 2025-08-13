import RNRestart from 'react-native-restart'

import {StateCreator} from 'zustand'

import {AppLanguage, setAppLanguage} from '~/locale'

export type UtilitySlice = {
  language: AppLanguage
  toggleAppLanguages: () => Promise<void>
}

export const createUtilitySlice: StateCreator<UtilitySlice> = (set, get) => ({
  language: 'en',
  toggleAppLanguages: async () => {
    const language = get().language === 'en' ? 'ar' : 'en'
    set(() => ({language}))
    await setAppLanguage(language)
    RNRestart.restart()
  },
})
