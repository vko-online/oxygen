import React, { ReactNode } from 'react'
import { TextStyle, TextProps, StyleSheet, View, ViewStyle } from 'react-native'
import { Button, TouchableRipple, Text, IconButton } from 'react-native-paper'
import { darkGray, primary } from 'src/constants/Colors'
import { Hpane } from 'view-on-steroids'

interface Props {
  icon: string
  style?: ViewStyle
  labelStyle?: TextStyle
  onPress?: () => void
  children: string
}
export function Address ({ icon, style, labelStyle, children, ...other }: Props) {
  return (
    <Button
      compact
      uppercase={false}
      icon={icon}
      color={darkGray}
      style={[{ alignItems: 'flex-start' }, style]}
      labelStyle={labelStyle}
      {...other}
    >
      {children}
    </Button>
  )
}

export function EventDate ({ style, children, labelStyle, ...other }: Omit<Props, 'icon'>) {
  return (
    <Button
      compact
      uppercase={false}
      icon='calendar'
      color={primary}
      size={20}
      style={[{ alignItems: 'flex-start' }, style]}
      labelStyle={labelStyle}
      {...other}
    >
      {children}
    </Button>
  )
}

interface CategoryProps {
  color: string
  children: string
  onPress?: () => void
}
export function Category ({ color, children, onPress }: CategoryProps) {
  return (
    <Button
      compact
      uppercase={false}
      icon={() => <View style={[s.circle, { backgroundColor: `#${intToRGB(hashCode(children))}` }]} />}
      color={darkGray}
      style={{ alignItems: 'flex-start' }}
      onPress={onPress}
    >
      {children}
    </Button>
  )
}

const s = StyleSheet.create({
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
