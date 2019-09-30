import React from 'react'
import { Text, Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Tabs from 'src/components/ant/Tabs'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import UpcomingScene from './scene.upcoming'
import TodayScene from './scene.today'
import PastScene from './scene.past'

import List from './list'

import { find } from './data'

const events = find()
interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const tabs = [
    { title: 'Today' },
    { title: 'Past' }
    // { title: 'Upcoming' }
  ]
  return (
    <Page>
      <Header title='Schedule' />
      <Tabs tabs={tabs} initialPage={0}>
        <List events={events} navigation={navigation} />
        <PastScene />
        {/* <UpcomingScene /> */}
      </Tabs>
    </Page>
  )
}
Screen.navigationOptions = {
  header: null
}
