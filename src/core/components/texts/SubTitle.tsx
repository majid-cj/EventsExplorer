import React, {FC} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native'

import {AppTheme} from '@react-navigation/native'

import {useAppStore} from '~/hooks'

interface SubTitleProps {
  text: string
  numberOfLines?: number
  style?: StyleProp<TextStyle>
}

export const SubTitle: FC<SubTitleProps> = ({text, style, numberOfLines = 1}) => {
  const {theme} = useAppStore()
  const styles = subTitleStyle(theme)

  return (
    <Text style={StyleSheet.flatten([styles.text, style])} numberOfLines={numberOfLines}>
      {text}
    </Text>
  )
}

const subTitleStyle = ({colors, fonts}: AppTheme) =>
  StyleSheet.create({
    text: {
      ...fonts.mediumFont,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      flexWrap: 'wrap',
    },
  })
