import React from 'react'
import { Platform } from 'react-native'
import { Appbar, IconButton, Colors } from 'react-native-paper'
import {
  createStackNavigator,
  StackNavigatorConfig,
  createDrawerNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import Home from 'src/screens/Home'
import PastScene from 'src/screens/Home/scene.past'
import TodayScene from 'src/screens/Home/scene.today'
import UpcomingScene from 'src/screens/Home/scene.upcoming'

import ScheduleScreen from 'src/screens/Schedule'
import AgendaScreen from 'src/screens/Agenda'
import FriendsScreen from 'src/screens/Friends'
import MapScreen from 'src/screens/Map'

import AboutScreen from 'src/screens/About'
import ProfileScreen from 'src/screens/Profile'

import Drawer from './drawer'
import Header from './tabbar'

const TabBarComponent = props => <BottomTabBar {...props} />
const config: StackNavigatorConfig = Platform.select<StackNavigatorConfig>({
  web: { headerMode: 'screen' },
  default: {}
})

const HomeStack: any = createBottomTabNavigator(
  {
    Past: PastScene,
    Today: TodayScene,
    Upcoming: UpcomingScene
  }, {
    swipeEnabled: true,
    tabBarComponent: () => <Header />
  }
)

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <IconButton icon='home' color={Colors.grey600} />
    }
    return <IconButton icon='home' color={Colors.grey300} />
  }
}

HomeStack.path = ''

const ScheduleStack: any = createStackNavigator(
  {
    Schedule: ScheduleScreen
  },
  config
)

ScheduleStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <IconButton icon='schedule' color={Colors.grey600} />
    }
    return <IconButton icon='schedule' color={Colors.grey300} />
  }
}

ScheduleStack.path = ''

const AgendaStack: any = createStackNavigator(
  {
    Agenda: AgendaScreen
  },
  config
)

AgendaStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <IconButton icon='view-agenda' color={Colors.grey600} />
    }
    return <IconButton icon='view-agenda' color={Colors.grey300} />
  }
}

AgendaStack.path = ''

const FriendsStack: any = createStackNavigator(
  {
    Friends: FriendsScreen
  },
  config
)

FriendsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <IconButton icon='perm-contact-calendar' color={Colors.grey600} />
    }
    return <IconButton icon='perm-contact-calendar' color={Colors.grey300} />
  }
}

FriendsStack.path = ''

const MapStack: any = createStackNavigator(
  {
    Map: MapScreen
  },
  config
)

MapStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <IconButton icon='map' color={Colors.grey600} />
    }
    return <IconButton icon='map' color={Colors.grey300} />
  }
}

MapStack.path = ''

const tabNavigator: any = createDrawerNavigator({
  HomeStack,
  ScheduleStack: ScheduleStack,
  RecipesStack: AgendaStack,
  FriendsStack: FriendsStack,
  MapStack: MapStack
}, {
  contentComponent: (props) => <Drawer {...props} />
})

tabNavigator.path = ''

const rootNavigator: any = createStackNavigator({
  Tabs: tabNavigator,
  About: AboutScreen,
  Profile: ProfileScreen
}, {
  initialRouteName: 'Tabs',
  headerMode: 'none'
})

rootNavigator.path = ''

export default rootNavigator
