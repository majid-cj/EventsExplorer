import '@react-navigation/native'

declare module '@react-navigation/native' {
  export type AppTheme = {
    dark: boolean
    colors: {
      secondary: string
      accent: string
      danger: string
      success: string
      background: string
      text: string
      lightText: string
      darkText: string
      lightBackground: string
      branchBackground: string
      border: string
      primary: string
      card: string
      notification: string
    }
    space: {
      small: number
      medium: number
      large: number
      xLarge: number
    }
    fonts: {
      smallFont: {
        fontSize: number
        color: string
      }
      mediumFont: {
        fontSize: number
        color: string
      }
      largeFont: {
        fontSize: number
        color: string
      }
      xLargeFont: {
        fontSize: number
        color: string
      }
    }
  }
  export function useTheme(): AppTheme
}
