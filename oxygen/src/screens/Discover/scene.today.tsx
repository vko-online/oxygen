import React from 'react'
import { Text, Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import { Event } from './data'
import List from './list'
import { extraExtraLightGray } from 'src/constants/Colors'

interface Props {
  events: Event[]
}
export default function Scene ({ events }: Props) {
  return (
    <Page>
      <List events={events} />
    </Page>
  )
}
