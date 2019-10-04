import React, { ReactNode, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { darkGray } from 'src/constants/Colors'

interface Props {
  title?: string
  subtitle?: string
  navigation: NavigationScreenProp<any, any>
}
function Header ({ navigation, title = 'Diet Doctor', subtitle }: Props) {
  return (
    <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
      <Appbar.Action icon='magnify' color={darkGray} onPress={() => navigation.navigate('Search')} />
      <Appbar.Content title={title} subtitle={subtitle} />
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.8}
      >
        <Avatar.Image size={30} source={require('src/assets/images/robot-dev.png')} />
      </TouchableOpacity>
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
