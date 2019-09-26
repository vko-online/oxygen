import React from 'react'
import { Text, Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import Tab from './tab'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({}: Props) {
  return (
    <Page>
      <Tab />
    </Page>
  )
}
Screen.navigationOptions = {
  header: (props) => <Header title='Home' {...props} />
}
