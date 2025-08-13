import 'react-native-gesture-handler'

import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import AppNavigationStack from '~/navigation'

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AppNavigationStack />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
