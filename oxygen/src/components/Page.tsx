import React, { ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, ViewProps, ScrollViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface Props extends ViewStyle {
  children?: ReactNode
  view?: ViewProps
  scroll?: boolean
  scrollView?: ScrollViewProps
}
export default function Page ({ children, scroll, scrollView, view, ...other }: Props) {
  if (scroll) {
    return (
      <ScrollView contentContainerStyle={[s.container, other]} {...scrollView}>
        {children}
      </ScrollView>
    )
  }
  return (
    <View style={[s.container, other]} {...view}>
      {children}
    </View>
  )
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
