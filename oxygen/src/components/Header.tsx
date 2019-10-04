import React, { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { primary, darkGray } from 'src/constants/Colors'
import Search from './Search'

interface Props {
  title?: string
  subtitle?: string
  navigation: NavigationScreenProp<any, any>
  children?: ReactNode
}
function Header ({ navigation, title = 'Diet Doctor', subtitle, children }: Props) {
  return (
    <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
      {
        children || (
          <Appbar.Action icon='magnify' color={darkGray} onPress={navigation.openDrawer} />
        )
      }
      <Appbar.Content title={title} subtitle={subtitle} />
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.8}
      >
        <Avatar.Image size={30} source={require('src/assets/images/robot-dev.png')} />
      </TouchableOpacity>
      <Search />
    </Appbar.Header>
  )
}

interface HeaderWithBackProps {
  title?: string
  subtitle?: string
  navigation: NavigationScreenProp<any, any>
  rightItem?: ReactNode
}
function _HeaderWithBack ({ navigation, title = 'Diet Doctor', subtitle, rightItem }: HeaderWithBackProps) {
  return (
    <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
      <Appbar.BackAction onPress={() => navigation.goBack()} color={darkGray} />
      <Appbar.Content title={title} subtitle={subtitle} />
      {rightItem}
    </Appbar.Header>
  )
}
export const HeaderWithBack = withNavigation(_HeaderWithBack)
export default withNavigation(Header)
