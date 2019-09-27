import React, { ReactNode } from 'react'
import { TextStyle, TextProps, StyleSheet, View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { darkGray } from 'src/constants/Colors'
import { Hpane } from 'view-on-steroids'

interface Props extends TextProps {
  icon: string
  style?: TextStyle
  children: string
}
export function Meta ({ icon, style, children, ...other }: Props) {
  return (
    <Hpane alignItems='center' justifyContent='flex-start'>
      <IconButton icon={icon} color={darkGray} style={s.icon} size={20} />
      <Text {...other} style={[s.text, style]}>{children}</Text>
    </Hpane>
  )
}

interface CategoryProps {
  color: string
  children: string
}
export function Category ({ color, children }: CategoryProps) {
  return (
    <Hpane alignItems='center' justifyContent='flex-start' marginLeft={9}>
      <View style={[s.circle, { backgroundColor: `#${intToRGB(hashCode(children))}` }]} />
      <Text style={s.chip}>{children}</Text>
    </Hpane>
  )
}

const s = StyleSheet.create({
  icon: {
    margin: 0
  },
  text: {
    fontSize: 14,
    color: darkGray
  },
  chip: {
    color: darkGray,
    fontSize: 12
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5
  }
})

function hashCode (str: string) { // java String#hashCode
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB (i: number) {
  let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}
