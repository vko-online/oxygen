import React from 'react'
import { Text, Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import Jumbotron from 'src/components/jumbotron'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({}: Props) {
  return (
    <Page>
      <Jumbotron />
      <Title>Screen</Title>
      <Text>Not implemented</Text>
    </Page>
  )
}
Screen.navigationOptions = {
  header: (props) => <Header title='Для вас' {...props} />
}
