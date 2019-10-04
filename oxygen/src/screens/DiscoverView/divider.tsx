import React from 'react'
import { View, StyleSheet } from 'react-native'
import { extraLightGray } from 'src/constants/Colors'

export default function Divider () {
  return <View style={s.divider} />
}

const s = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: extraLightGray,
    marginVertical: 10
  }
})
