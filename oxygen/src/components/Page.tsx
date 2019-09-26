import React, { ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface Props extends ViewStyle {
  children?: ReactNode
}
export default function Page ({ children, ...other }: Props) {
  return (
    <View style={[s.container, other]}>
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
