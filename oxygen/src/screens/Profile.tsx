import React from 'react'
import { Appbar, Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Page from 'src/components/Page'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <Page>
      <Appbar.Header style={{ zIndex: 100 }} theme={{ colors: { primary: '#fff' } }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Profile' />
      </Appbar.Header>
      <Headline>About</Headline>
    </Page>
  )
}
