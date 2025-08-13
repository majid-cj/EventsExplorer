import React, {FC, useCallback, useEffect, useState} from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {setupNetwork} from '~/core/network'
import {setAppLanguage} from '~/locale'
import Home from '~/screens/home'
import Detail from '~/screens/details'
import Profile from '~/screens/profile'
import {useAppStore} from '~/hooks'

import {AppParamsList, DetailParamsList} from './types'
import Authenticate from '~/screens/Authenticate'

const AppNavigationStack: FC = () => {
  const {theme, language} = useAppStore()
  const [lang, setLang] = useState<undefined | string>(undefined)
  const {Navigator, Screen} = createNativeStackNavigator<AppParamsList>()

  const setAppReady = useCallback(async () => {
    await setupNetwork()
    const locale = await setAppLanguage(language)
    setLang(locale)
  }, [])

  useEffect(() => {
    setAppReady()
  }, [])

  if (lang === undefined) {
    return null
  }

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={'AUTHENTICATE'}
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        <Screen name={'AUTHENTICATE'} key={'AUTHENTICATE'} component={Authenticate} />
        <Screen name={'HOME'} key={'HOME'} component={Home} />
        <Screen name={'DETAIL'} key={'DETAIL'} component={EventDetailStack} />
        <Screen name={'PROFILE'} key={'PROFILE'} component={Profile} />
      </Navigator>
    </NavigationContainer>
  )
}

const EventDetailStack: FC = () => {
  const {theme} = useAppStore()
  const {Navigator, Screen} = createNativeStackNavigator<DetailParamsList>()
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Screen name={'EVENT'} key={'EVENT'} component={Detail} />
    </Navigator>
  )
}

export default AppNavigationStack
