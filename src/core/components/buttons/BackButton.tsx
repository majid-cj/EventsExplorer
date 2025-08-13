import React, {FC} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {AppTheme} from '@react-navigation/native'
import {useNavigation} from '@react-navigation/core'

import {useAppStore} from '~/hooks'
import {BackIcon} from '../ui'

interface Props {
  backAction?: () => void
}

export const BackButton: FC<Props> = ({backAction}) => {
  const {goBack} = useNavigation()
  const {theme} = useAppStore()

  const styles = backButtonStyle(theme)
  return (
    <TouchableOpacity onPress={backAction ? backAction : goBack} style={styles.container} activeOpacity={0.9}>
      <BackIcon />
    </TouchableOpacity>
  )
}

const backButtonStyle = ({colors, space}: AppTheme) =>
  StyleSheet.create({
    container: {
      width: space.xLarge,
      height: space.xLarge,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
