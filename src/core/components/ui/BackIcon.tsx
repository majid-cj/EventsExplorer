import React, {FC} from 'react'

import {useAppStore} from '~/hooks'
import {ArrowLeft, ArrowRight} from '~/core/resource/icons/common'

export const BackIcon: FC = () => {
  const {theme, language} = useAppStore()
  const Icon = language === 'en' ? ArrowLeft : ArrowRight
  return <Icon color={theme.colors.text} size={theme.space.large} />
}
