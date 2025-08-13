import i18n from 'i18next'

import {initReactI18next} from 'react-i18next'
import {I18nManager, NativeModules, Platform} from 'react-native'

import ar from './ar'
import en from './en'

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ar: {translation: ar},
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export type AppLanguage = 'en' | 'ar'

const getAllowedLanguage = (language: string) => {
  return ['ar', 'en'].includes(language) ? language : 'en'
}

export const getAppLanguage = async (): Promise<string> => {
  try {
    let languageTag = 'en'
    let deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier
    languageTag = deviceLanguage.toString().split('_')[0]
    return getAllowedLanguage(languageTag)
  } catch (err) {
    return 'en'
  }
}

export const setAppLanguage = async (language: string): Promise<string> => {
  try {
    i18n.changeLanguage(getAllowedLanguage(language))
    I18nManager.forceRTL(language === 'ar')
    I18nManager.allowRTL(language === 'ar')
    return getAllowedLanguage(language)
  } catch (error: any) {
    return 'en'
  }
}

export const strings = (name: string, params = {}): string => {
  return i18n.t(name, params)
}

export default i18n
