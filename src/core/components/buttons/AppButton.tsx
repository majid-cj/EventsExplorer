import React, {FC} from 'react'
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'

import {AppTheme} from '@react-navigation/native'

import {useAppStore} from '~/hooks'

interface AppButtonProps {
  onPress: () => void
  text: string
}

export const AppButton: FC<AppButtonProps> = ({onPress, text}) => {
  const {theme} = useAppStore()
  const styles = appButtonStyles(theme)

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

const {width} = Dimensions.get('screen')

const appButtonStyles = ({colors, space, fonts}: AppTheme) =>
  StyleSheet.create({
    container: {
      width: width - space.xLarge,
      height: space.xLarge * 2,
      borderRadius: space.medium,
      backgroundColor: colors.branchBackground,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      ...fonts.xLargeFont,
    },
  })
