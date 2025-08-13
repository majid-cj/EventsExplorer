import React, {FC, ReactElement} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import SVG from 'react-native-svg'

import {useAppStore} from '~/hooks'

import {emptyListStyle} from './styles'

interface EmptyListProps {
  icon?: ReactElement<SVG>
  error: string
  onPress?: () => void
}

export const EmptyList: FC<EmptyListProps> = ({icon, error, onPress}) => {
  const {theme} = useAppStore()
  const styles = emptyListStyle(theme)
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
      {icon}
      <Text style={styles.text} numberOfLines={2}>
        {error}
      </Text>
    </TouchableOpacity>
  )
}
