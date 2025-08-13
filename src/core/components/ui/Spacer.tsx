import React, {FC} from 'react'
import {View} from 'react-native'

import {useAppStore} from '~/hooks'

import {spacerStyle} from './styles'

interface SpacesSizes {
  xs: string
  s: string
  md: string
  lg: string
  xl: string
  xxl: string
  l48: string
  l56: string
  l64: string
  l72: string
  l84: string
  l128: string
}

const SpaceSize = {
  xs: 4,
  s: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  l48: 48,
  l56: 56,
  l64: 64,
  l72: 72,
  l84: 84,
  l128: 128,
}

interface Props {
  visible?: boolean
  size?: keyof SpacesSizes
}

export const Spacer: FC<Props> = ({size = 'xs', visible = false}) => {
  const {theme} = useAppStore()
  const {container} = spacerStyle(theme, SpaceSize[size], visible)
  return <View style={container} />
}
