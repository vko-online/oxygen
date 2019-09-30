import { DefaultTheme, Theme } from 'react-native-paper'

export const tintColor = '#2f95dc'
export const activeIcon = '#1DA1F2'
export const primary = '#4285f4'
export const primaryDark = '#333333'
export const black = '#14171A'
export const darkGray = '#657786'
export const lightGray = '#AAB8C2'
export const lightBlue = '#d3e3f9'
export const yellow = '#fbbc04'
export const lightYellow = '#fde293'
export const lightGreen = '#fdedc5'
export const extraLightGray = '#E1E8ED'
export const extraExtraLightGray = '#F5F8FA'
export const white = '#FFFFFF'
export const lightRed = '#fc6b03'

export const tabIconDefault = '#ccc'
export const tabIconSelected = tintColor
export const tabBar = '#fefefe'
export const errorBackground = 'red'
export const errorText = '#fff'
export const warningBackground = '#EAEB5E'
export const warningText = '#666804'
export const noticeBackground = tintColor
export const noticeText = '#fff'

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 1,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: primary,
    background: white,
    text: black,
    accent: darkGray,
    backdrop: lightGray,
    disabled: extraLightGray,
    error: 'red',
    placeholder: lightGray,
    surface: extraExtraLightGray
  },
  fonts: {
    light: {
      fontFamily: 'opensans-light',
      fontWeight: '100'
    },
    medium: {
      fontFamily: 'opensans-semi-bold',
      fontWeight: '600'
    },
    regular: {
      fontFamily: 'opensans-regular'
    },
    thin: {
      fontFamily: 'opensans-light',
      fontWeight: '300'
    }
  }
}
