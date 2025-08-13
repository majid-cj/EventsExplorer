import React, {FC} from 'react'

import {useAppStore} from '~/hooks'
import {Dark, Light} from '~/core/resource/icons/common'

export const ThemeIcon: FC = () => {
  const {theme} = useAppStore()
  const Icon = theme.dark ? Light : Dark
  return <Icon color={theme.colors.text} size={theme.space.large} />
}
