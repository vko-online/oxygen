import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {
  children?: ReactNode
}
export default function Page ({ children }: Props) {
  return (
    <View style={s.container}>
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
