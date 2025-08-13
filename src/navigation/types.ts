import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export type ScreenProps = {
  navigation: NavigationProp<AppParamsList>
  route: RouteProp<ParamListBase, string>
}

export type AppParamsList = {
  AUTHENTICATE: undefined
  HOME: undefined
  DETAIL: {
    screen: 'EVENT'
    params: {
      id: string
    }
  }
  PROFILE: undefined
}

export type DetailParamsList = {
  EVENT: {
    id: string
  }
}

export type AppNavigationProps = NativeStackNavigationProp<AppParamsList>
export type DetailNavigationProps = NativeStackNavigationProp<DetailParamsList>
