import React, { useState } from 'react'
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native'
import { Subheading } from 'react-native-paper'
import { TabView, SceneMap } from 'react-native-tab-view'
import Animated from 'react-native-reanimated'
import PastScene from './scene.past'
import TodayScene from './scene.today'
import UpcomingScene from './scene.upcoming'

interface Props {}
export default function Tab ({}: Props) {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'past', title: 'Past' },
      { key: 'today', title: 'Today' },
      { key: 'upcoming', title: 'Upcoming' }
    ]
  })

  function renderTabBar (props) {
    const inputRange = props.navigationState.routes.map((x, i) => i)

    return (
      <View style={s.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={s.tabItem}
              key={i}
              onPress={() => handleIndexChange(i)}>
              <Animated.Text>{route.title}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  function handleIndexChange (index) {
    setState({
      ...state,
      index
    })
  }

  function renderScene () {
    return SceneMap({
      past: PastScene,
      today: TodayScene,
      upcoming: UpcomingScene
    })
  }

  return (
    <TabView
      navigationState={state}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  )
}

const s = StyleSheet.create({
  tabBar: {
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16
  }
})
