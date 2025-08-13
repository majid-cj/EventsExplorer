import React, {FC} from 'react'
import {ActivityIndicator, View} from 'react-native'

import {useAppStore} from '~/hooks'

import {spinnerStyle} from './styles'

interface SpinnerProps {
  size?: number
}

export const Spinner: FC<SpinnerProps> = ({size = 125}) => {
  const {theme} = useAppStore()
  const styles = spinnerStyle(theme)

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.accent} />
    </View>
  )
}
