import React from 'react'
import { Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Page from 'src/components/Page'
import Header from 'src/components/Header'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <Page>
      <Header title='Избранное' />
      <Headline>About</Headline>
    </Page>
  )
}
Screen.navigationOptions = {
  header: null
}
