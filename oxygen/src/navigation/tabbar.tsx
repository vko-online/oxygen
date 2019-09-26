import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Surface, Subheading } from 'react-native-paper'
import { Hpane } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'

const initialState = 'today'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Tabbar ({ navigation }: Props) {
  const [activeScene, setActiveScene] = useState(initialState)
  return (
    <Appbar style={{ flexDirection: 'row' }}>
      <Surface style={{ zIndex: 3, flex: 1 }}>
        <Hpane justifyContent='space-evenly'>
          <Subheading style={s.subheading}>Past</Subheading>
          <Subheading style={s.subheading}>Today</Subheading>
          <Subheading style={s.subheading}>Upcoming</Subheading>
        </Hpane>
      </Surface>
    </Appbar>
  )
}

const s = StyleSheet.create({
  subheading: {
    flex: 0.33,
    textAlign: 'center',
    margin: 5,
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#3434ed',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
})
