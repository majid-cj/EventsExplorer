import React, {FC} from 'react'

import {useAppStore} from '~/hooks'
import {Arabic, English} from '~/core/resource/icons/common'

export const LanguageIcon: FC = () => {
  const {theme, language} = useAppStore()
  const Icon = language === 'en' ? Arabic : English
  return <Icon color={theme.colors.text} size={theme.space.large} />
}
