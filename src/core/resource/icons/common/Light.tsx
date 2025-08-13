import React, { FC } from 'react'
import SVG, { Path, G, Rect } from 'react-native-svg'

import { IconsProps } from './types'

export const Light: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 36 36'>
      <G data-name='Lager 93'>
        <G data-name='Sun 3, Brightness 3' transform='translate(2 2)'>
          <Path
            data-name='Path 68'
            d='M32 14h-4.967c-2 1.769-.779 4 .967 4h4.967c1.999-1.769.779-4-.967-4z'
            fill={color}
          />
          <G data-name='Path 69' fill='none' strokeMiterlimit={10}>
            <Path d='M17.172 10.111a6 6 0 104.715 4.715 6.01 6.01 0 00-4.715-4.715z' />
            <Path
              d='M15.999 14c-.599 0-1.161.265-1.544.726-.274.331-.568.896-.415 1.706.139.731.796 1.388 1.528 1.527.145.027.29.041.43.041.598 0 1.16-.265 1.542-.726.275-.331.57-.896.417-1.703-.139-.734-.796-1.391-1.529-1.53a2.319 2.319 0 00-.43-.041m0-4c.384 0 .777.036 1.174.111 2.349.445 4.27 2.366 4.715 4.715A6.006 6.006 0 0115.997 22c-.383 0-.776-.036-1.173-.111-2.348-.445-4.27-2.366-4.714-4.714A6.005 6.005 0 0115.999 10z'
              fill={color}
            />
          </G>
          <Rect data-name='Rectangle 26' width={8} height={4} rx={1.993} transform='translate(26 14)' fill={color} />
          <Rect data-name='Rectangle 27' width={8} height={4} rx={1.993} transform='rotate(90 -4 22)' fill={color} />
          <Rect data-name='Rectangle 28' width={8} height={4} rx={1.993} transform='rotate(90 10 8)' fill={color} />
          <Rect data-name='Rectangle 29' width={8} height={4} rx={1.993} transform='translate(-2 14)' fill={color} />
          <G data-name='Group 22'>
            <Rect
              data-name='Rectangle 30'
              width={6.925}
              height={3.766}
              rx={1.883}
              transform='rotate(-45 18.994 -24.97)'
              fill={color}
            />
          </G>
          <G data-name='Group 23'>
            <Rect
              data-name='Rectangle 31'
              width={3.766}
              height={6.925}
              rx={1.883}
              transform='rotate(-45 42.86 -15.08)'
              fill={color}
            />
          </G>
          <G data-name='Group 24'>
            <Rect
              data-name='Rectangle 32'
              width={3.766}
              height={6.925}
              rx={1.883}
              transform='rotate(-45 5.297 .469)'
              fill={color}
            />
          </G>
          <G data-name='Group 25'>
            <Rect
              data-name='Rectangle 33'
              width={6.925}
              height={3.766}
              rx={1.883}
              transform='rotate(-45 34.55 12.586)'
              fill={color}
            />
          </G>
        </G>
      </G>
    </SVG>
  )
}
