import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp, withNavigation } from 'react-navigation'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  navigation: NavigationScreenProp<any, any>
}
function Header ({ navigation, title = 'Diet Doctor', subtitle, icon = 'menu' }: Props) {
  return (
    <Appbar.Header style={{ zIndex: 100 }} theme={{ colors: { primary: '#fff' } }}>
      <Appbar.Action icon={icon} onPress={navigation.openDrawer} />
      <Appbar.Content title={title} subtitle={subtitle} />
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Profile')}>
        <Avatar.Image size={40} source={require('src/assets/images/robot-dev.png')} />
      </TouchableOpacity>
    </Appbar.Header>
  )
}

export default withNavigation(Header)
