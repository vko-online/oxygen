import React, { useContext, useState } from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import {
  DrawerItemsProps, NavigationScreenProp, DrawerNavigationState, withNavigation
} from 'react-navigation'
import { Avatar, Text, Drawer, Subheading, Caption, Switch, Dialog, Portal, Button, Paragraph, Badge, IconButton } from 'react-native-paper'
import { Scene, Hpane, Vpane } from 'view-on-steroids'
import { extraExtraLightGray } from 'src/constants/Colors'
// import { logout } from '../actions/auth'

interface Props extends DrawerItemsProps {
  navigation: NavigationScreenProp<DrawerNavigationState>
}
function User () {
  return (
    <Hpane padding={10} justifyContent='flex-start' alignItems='center'>
      <Avatar.Image source={require('src/assets/images/robot-dev.png')} />
      <Vpane marginLeft={10}>
        <Subheading>Medet Tleukabiluly</Subheading>
        {/* <Button icon='bell-outline' compact theme={{ colors: { primary: extraExtraLightGray } }}>
          10 notifications
        </Button> */}
      </Vpane>
    </Hpane>
  )
}

function CreateEvent () {
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
      <Button
        mode='contained'
        icon='note-plus'
        compact
        theme={{ roundness: 4 }}
      >
        Create event
      </Button>
    </View>
  )
}

function DrawerComponent ({ navigation }: Props) {
  const [visible, setVisiblity] = useState(false)
  const parentRoute = navigation.state.routes[navigation.state.index]
  const { routeName } = parentRoute.routes[parentRoute.index]
  return (
    <View style={s.container}>
      <User />
      <CreateEvent />
      <Drawer.Section title='Events'>
        {/* <Drawer.Item label='Home' icon='home' onPress={() => navigation.navigate('Home')} /> */}
        <Drawer.Item
          active={routeName === 'Schedule'}
          label='Schedule' icon='view-agenda'
          onPress={() => navigation.navigate('Schedule')}
        />
        <Drawer.Item
          active={routeName === 'Agenda'}
          label='Agenda'
          icon='calendar-today'
          onPress={() => navigation.navigate('Agenda')}
        />
        {/* <Drawer.Item
          active={routeName === 'Friends'}
          label='Friends'
          icon='contacts'
          onPress={() => navigation.navigate('Friends')}
        /> */}
        <Drawer.Item
          active={routeName === 'Map'}
          label='Map'
          icon='map-search'
          onPress={() => navigation.navigate('Map')}
        />
      </Drawer.Section>
      <Drawer.Section title='Preferences'>
        <Drawer.Item label='Info' icon='information' />
        <Drawer.Item label='Settings' icon='settings' />
      </Drawer.Section>
      <Drawer.Item label='Log out' icon='exit-to-app' onPress={() => setVisiblity(true)} />
      <Portal>
        <Dialog
          visible={visible}
          style={{ backgroundColor: '#fff' }}
          onDismiss={() => setVisiblity(false)}>
          <Dialog.Title>Exit</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode='text' onPress={() => setVisiblity(false)}>Cancel</Button>
            <Button mode='text' onPress={() => console.log('logout')}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingTop: 40
      },
      android: {
        paddingTop: 20
      }
    })
  }
})

export default withNavigation(DrawerComponent)
