import React, { useContext, useState } from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import {
  DrawerItemsProps, NavigationScreenProp, DrawerNavigationState, withNavigation
} from 'react-navigation'
import { Avatar, Text, Drawer, Subheading, Caption, Switch, Dialog, Portal, Button, Paragraph, Badge } from 'react-native-paper'
import { Scene, Hpane, Vpane } from 'view-on-steroids'
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
      </Vpane>
    </Hpane>
  )
}
function DrawerComponent ({ navigation }: Props) {
  const [visible, setVisiblity] = useState(false)
  return (
    <View style={s.container}>
      <User />
      <Drawer.Section title='Events'>
        <Drawer.Item label='Home' icon='home' onPress={() => navigation.navigate('Home')} />
        <Drawer.Item label='Schedule' icon='schedule' onPress={() => navigation.navigate('Schedule')} />
        <Drawer.Item label='Agenda' icon='view-agenda' onPress={() => navigation.navigate('Agenda')} />
        <Drawer.Item label='Friends' icon='perm-contact-calendar' onPress={() => navigation.navigate('Friends')} />
        <Drawer.Item label='Map' icon='map' onPress={() => navigation.navigate('Map')} />
      </Drawer.Section>
      <Drawer.Section title='Preferences'>
        <Drawer.Item label='Info' icon='info' />
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
