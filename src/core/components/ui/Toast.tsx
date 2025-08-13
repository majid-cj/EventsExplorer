import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
import {Animated, Dimensions, Easing, Text, TouchableOpacity} from 'react-native'

import {useAppStore} from '~/hooks'

import {toastStyle} from './styles'

interface ToastProps {
  toast: ToastType
}

export type ToastType = {
  error?: boolean
  warning?: boolean
  success?: boolean
  message?: string
}

export const Toast: FC<ToastProps> = ({toast: toast}) => {
  const {theme} = useAppStore()
  const {colors} = theme
  const initialState: ToastType = {
    error: false,
    warning: false,
    success: false,
    message: undefined,
  }

  const [toastValue, setToastValue] = useState<ToastType>(initialState)
  const IS_LARGE_SCALE = Dimensions.get('screen').scale > 2

  const HEIGHT = IS_LARGE_SCALE ? 64 : 56

  const styles = toastStyle(theme)
  const animationBottom = useRef(new Animated.Value(0)).current

  const startAnimation = useMemo(
    () => () => {
      Animated.timing(animationBottom, {
        toValue: HEIGHT * 2,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }).start()
    },
    []
  )

  const closeAnimation = useMemo(
    () => () => {
      Animated.timing(animationBottom, {
        toValue: -HEIGHT,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.bezier(0, 0, 0.58, 1),
      }).start()
    },
    []
  )

  useEffect(() => {
    if (toast.message) {
      setToastValue(toast)
      startAnimation()
    }
  }, [toast])

  const {message, error, success, warning} = toastValue

  if (!message) {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: animationBottom,
        },
        error && {backgroundColor: colors.danger},
        success && {backgroundColor: colors.success},
        warning && {backgroundColor: colors.notification},
      ]}>
      <TouchableOpacity
        style={[
          styles.subContainer,
          {
            paddingTop: IS_LARGE_SCALE ? theme.space.small : 0,
          },
        ]}
        activeOpacity={1}
        onPress={closeAnimation}>
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
