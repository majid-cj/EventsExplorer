import React, { FC } from 'react'
import SVG, { Path, Rect } from 'react-native-svg'

import { IconsProps } from './types'

export const English: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 48 48' fill='none'>
      <Path
        d='M13 31V17h8M13 24h7.5M13 31h7.5M26 31V19M26 31v-6.5a4.5 4.5 0 014.5-4.5v0a4.5 4.5 0 014.5 4.5V31'
        stroke={color}
        strokeWidth={4}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Rect
        x={6}
        y={6}
        width={36}
        height={36}
        rx={3}
        stroke={color}
        strokeWidth={4}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </SVG>
  )
}
