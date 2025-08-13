import { Dimensions, StyleSheet } from 'react-native'

import { AppTheme } from '@react-navigation/native'

const { width } = Dimensions.get('screen')

export const emptyListStyle = ({ space, fonts, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      width,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      marginVertical: space.xLarge,
      padding: space.xLarge,
    },
    text: {
      ...fonts.mediumFont,
      textAlign: 'center',
      marginTop: space.small,
    },
  })

export const vendorAuthStepStyle = ({ space, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: space.large,
      left: space.large,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  })

export const gradientStepStyle = ({ fonts, space, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: space.xLarge,
      height: space.xLarge,
      borderRadius: space.medium,
      overflow: 'hidden',
      marginHorizontal: space.small,
      backgroundColor: colors.background,
    },
    text: {
      ...fonts.largeFont,
    },
  })

export const toastStyle = ({ colors, fonts, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      width,
      position: 'absolute',
      bottom: -128,
      zIndex: 10,
      backgroundColor: colors.primary,
      paddingVertical: space.small,
    },
    subContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: space.medium,
    },
    message: {
      ...fonts.mediumFont,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  })

export const spinnerStyle = ({ colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  })

export const toolBarStyles = ({ colors, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      padding: space.large,
      height: width / 5,
    },
    area: {
      width: space.xLarge,
      height: space.xLarge,
    },
  })

export const spacerStyle = ({ colors, space }: AppTheme, height: number = space.small, visible: boolean = false) =>
  StyleSheet.create({
    container: {
      width,
      backgroundColor: visible ? colors.accent : 'transparent',
      height: height,
    },
  })
