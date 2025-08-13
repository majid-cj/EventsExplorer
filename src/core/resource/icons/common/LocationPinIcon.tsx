import React, {FC} from 'react'
import SVG, {Path} from 'react-native-svg'

import {IconsProps} from './types'

export const LocationPinIcon: FC<IconsProps> = ({color = '#000', size = 25}) => {
  return (
    <SVG x='0px' y='0px' viewBox='0 0 512 512' width={size} height={size}>
      <Path
        d='M206.549 0c-82.6 0-149.3 66.7-149.3 149.3 0 28.8 9.2 56.3 22 78.899l97.3 168.399c6.1 11 18.4 16.5 30 16.5 11.601 0 23.3-5.5 30-16.5l97.3-168.299c12.9-22.601 22-49.601 22-78.901C355.849 66.8 289.149 0 206.549 0zm0 193.4c-30 0-54.5-24.5-54.5-54.5s24.5-54.5 54.5-54.5 54.5 24.5 54.5 54.5c0 30.1-24.5 54.5-54.5 54.5z'
        fill={color}
      />
    </SVG>
  )
}
