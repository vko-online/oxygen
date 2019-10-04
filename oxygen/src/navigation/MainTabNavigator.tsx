import React from 'react'
import { Platform } from 'react-native'
import { Appbar, IconButton as MaterialIconButton, Colors } from 'react-native-paper'
import {
  createStackNavigator,
  StackNavigatorConfig,
  createDrawerNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation'
import {
  createFluidNavigator
} from 'react-navigation-fluid-transitions'

import MyScreen from 'src/screens/My'
import DiscoverScreen from 'src/screens/Discover'
import DiscoverViewScreen from 'src/screens/DiscoverView'
import CreateScreen from 'src/screens/Create'
import InboxScreen from 'src/screens/Inbox'
import ProfileScreen from 'src/screens/Profile'
import FavoriteScreen from 'src/screens/Favorite'

import AboutScreen from 'src/screens/About'
// import ProfileScreen from 'src/screens/Profile'

import Drawer from './drawer'
import { primary } from 'src/constants/Colors'

function IconButton (props) {
  return <MaterialIconButton size={30} {...props} style={{ padding: 0, margin: 0 }} />
}

const config: StackNavigatorConfig = Platform.select<StackNavigatorConfig>({
  web: { headerMode: 'screen' },
  default: {}
})

const MyStack: any = createStackNavigator(
  {
    My: MyScreen
  },
  config
)

MyStack.path = ''

const DiscoverStack: any = createFluidNavigator(
  {
    Discover: DiscoverScreen,
    DiscoverView: DiscoverViewScreen
  },
  config
)

DiscoverStack.path = ''

const CreateStack: any = createStackNavigator(
  {
    Create: CreateScreen
  },
  config
)

CreateStack.path = ''

const InboxStack: any = createStackNavigator(
  {
    Inbox: InboxScreen
  },
  config
)

InboxStack.path = ''

const FavoriteStack: any = createStackNavigator(
  {
    Favorite: FavoriteScreen
  },
  config
)

const ProfileStack: any = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
)

ProfileStack.path = ''

const tabNavigator: any = createBottomTabNavigator({
  MyStack: {
    screen: MyStack,
    navigationOptions: {
      title: 'Для вас',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return <IconButton icon='view-dashboard' color={Colors.grey600} />
        }
        return <IconButton icon='view-dashboard' color={Colors.grey300} />
      }
    }
  },
  DiscoverStack: {
    screen: DiscoverStack,
    navigationOptions: {
      title: 'События',
      tabBarIcon: ({ focused, tintColor }) => {
        if (focused) {
          return <IconButton icon='view-carousel' color={tintColor} />
        }
        return <IconButton icon='view-carousel' color={Colors.grey300} />
      }
    }
  },
  // CreateStack,
  FavoriteStack: {
    screen: FavoriteStack,
    navigationOptions: {
      title: 'Избранное',
      tabBarIcon: ({ focused, tintColor }) => {
        if (focused) {
          return <IconButton icon='star' color={tintColor} />
        }
        return <IconButton icon='star' color={Colors.grey300} />
      }
    }
  },
  InboxStack: {
    screen: InboxStack,
    navigationOptions: {
      title: 'Уведомления',
      tabBarIcon: ({ focused, tintColor }) => {
        if (focused) {
          return <IconButton icon='bell' color={tintColor} />
        }
        return <IconButton icon='bell' color={Colors.grey300} />
      }
    }
  }
  // ProfileStack
}, {
  tabBarComponent: BottomTabBar,
  initialRouteName: 'MyStack',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: primary,
    labelStyle: {
      fontFamily: 'opensans-semi-bold',
      fontSize: 10
    }
  }
})

tabNavigator.apply = ''

// const drawerNavigator: any = createDrawerNavigator({
//   MyStack,
//   DiscoverStack,
//   CreateStack,
//   InboxStack,
//   ProfileStack
// }, {
//   contentComponent: (props) => <Drawer {...props} />
// })

// drawerNavigator.path = ''

const rootNavigator: any = createStackNavigator({
  Tabs: tabNavigator,
  About: AboutScreen
  // Profile: ProfileScreen
}, {
  initialRouteName: 'Tabs',
  headerMode: 'none'
})

rootNavigator.path = ''

export default rootNavigator
