import React, { useState } from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'
import { Text, Title, Appbar, Searchbar, TextInput, Chip } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Modal from 'modal-react-native-web'
import Tabs from 'src/components/ant/Tabs'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import UpcomingScene from './scene.upcoming'
import TodayScene from './scene.today'
import PastScene from './scene.past'

import List from './list'

import { find, categories } from './data'

const events = find()
interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const tabs = [
    { title: 'Сегодня' },
    { title: 'Рядом' },
    { title: 'На неделе' },
    { title: 'Кино' }
    // { title: 'Upcoming' }
  ]

  return (
    <Page>
      <Header title='События' />
      <Tabs tabs={tabs} initialPage={0}>
        <List events={events} navigation={navigation} />
        <PastScene />
        <PastScene />
        <PastScene />
        {/* <UpcomingScene /> */}
      </Tabs>
    </Page>
  )
}
Screen.navigationOptions = {
  header: null
}
