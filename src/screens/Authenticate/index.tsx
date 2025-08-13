import React, {FC, useState} from 'react'
import {View, TouchableOpacity, Linking, Platform, Alert} from 'react-native'

import {StackActions} from '@react-navigation/native'

import {ScreenProps} from '~/navigation/types'
import {Screen, AppButton, SubTitle, ToolBar, ThemeIcon, LanguageIcon, Spacer} from '~/core/components'
import {useAppStore, useAuthentication} from '~/hooks'
import {strings} from '~/locale'

const Authenticate: FC<ScreenProps> = ({navigation}) => {
  const {theme, toggleTheme, toggleAppLanguages, resetAppState} = useAppStore()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const navigateHome = () => {
    resetAppState()
    navigation.dispatch(StackActions.replace('HOME'))
  }

  const handleAuthenticationError = (error: any) => {
    console.error('Authentication error:', error)
    Alert.alert(strings('authenticationError'), strings('authenticationErrorMessage'), [
      {
        text: strings('tryAgain'),
        onPress: () => handleAuthentication(),
      },
      {
        text: strings('skip'),
        onPress: navigateHome,
        style: 'cancel',
      },
    ])
  }

  const handleAuthentication = async () => {
    if (isAuthenticating) return

    setIsAuthenticating(true)
    try {
      await checkAuthentication()
    } catch (error) {
      handleAuthenticationError(error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const {compatible, checkAuthentication} = useAuthentication({
    callBack: navigateHome,
    onError: handleAuthenticationError,
  })

  const handleSettingsPress = async () => {
    try {
      if (Platform.OS === 'ios') {
        const canOpen = await Linking.canOpenURL('app-settings:')
        if (canOpen) {
          await Linking.openURL('app-settings:')
        } else {
          await Linking.openSettings()
        }
      } else {
        await Linking.openSettings()
      }
    } catch (error) {
      console.error('Failed to open settings:', error)
      Alert.alert(strings('error'), strings('unableToOpenSettings'))
    }
  }

  const renderContent = () => {
    switch (compatible) {
      case 'initiate':
        return (
          <View style={{width: '100%', padding: theme.space.medium}}>
            <SubTitle text={strings('checkingBiometrics')} style={{...theme.fonts.xLargeFont}} numberOfLines={2} />
          </View>
        )

      case 'not_compatible':
        return (
          <View style={{width: '100%', padding: theme.space.medium}}>
            <SubTitle text={strings('biometricsNotAvailable')} style={{...theme.fonts.xLargeFont}} numberOfLines={3} />
            <Spacer size={'md'} />
            <SubTitle
              text={strings('biometricsNotAvailableDescription')}
              style={{...theme.fonts.mediumFont, color: theme.colors.lightText}}
              numberOfLines={5}
            />
          </View>
        )

      case 'compatible':
      default:
        return (
          <View style={{width: '100%', padding: theme.space.medium}}>
            <SubTitle text={strings('biometric')} style={{...theme.fonts.xLargeFont}} numberOfLines={2} />
            <Spacer size={'md'} />
            <SubTitle
              text={strings('biometricDescription')}
              style={{...theme.fonts.mediumFont, color: theme.colors.lightText}}
              numberOfLines={3}
            />
            <Spacer size={'l48'} />
            <TouchableOpacity
              onPress={handleAuthentication}
              disabled={isAuthenticating}
              style={{
                opacity: isAuthenticating ? 0.6 : 1,
                backgroundColor: theme.colors.primary,
                padding: theme.space.medium,
                borderRadius: theme.space.medium,
                alignItems: 'center',
              }}
              activeOpacity={0.8}>
              <SubTitle
                text={isAuthenticating ? strings('authenticating') : strings('authenticate')}
                style={{...theme.fonts.largeFont, color: 'white'}}
              />
            </TouchableOpacity>
          </View>
        )
    }
  }

  const renderFooter = () => {
    if (compatible === 'compatible') {
      return (
        <>
          <AppButton text={strings('openSettings')} onPress={handleSettingsPress} />
          <Spacer size={'md'} />
          <TouchableOpacity onPress={navigateHome} activeOpacity={0.8}>
            <SubTitle text={strings('skip')} style={{...theme.fonts.largeFont}} />
          </TouchableOpacity>
        </>
      )
    }

    if (compatible === 'not_compatible') {
      return <AppButton text={strings('continue')} onPress={navigateHome} />
    }

    return null
  }

  return (
    <Screen
      header={
        <ToolBar
          leftButton={
            <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
              <ThemeIcon />
            </TouchableOpacity>
          }
          menuButton={
            <TouchableOpacity onPress={toggleAppLanguages} activeOpacity={0.8}>
              <LanguageIcon />
            </TouchableOpacity>
          }
        />
      }
      footer={renderFooter()}>
      {renderContent()}
    </Screen>
  )
}

export default Authenticate
