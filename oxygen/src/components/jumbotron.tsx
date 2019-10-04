import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Surface, Title, Caption } from 'react-native-paper'
import { white } from 'src/constants/Colors'
import { Hpane, Vpane } from 'view-on-steroids'

export default function () {
  return (
    <Surface style={s.surface}>
      <Hpane>
        <Vpane>
          <Title style={s.title}>Сводка событии для вас</Title>
          <Caption style={s.caption}>5 главных событии этой недели</Caption>
        </Vpane>
        <Image source={require('src/assets/images/alert.png')} style={s.image} />
      </Hpane>
    </Surface>
  )
}

const s = StyleSheet.create({
  surface: {
    backgroundColor: white,
    // margin: 5,
    padding: 15,
    elevation: 0
  },
  caption: {
    fontSize: 14,
    fontFamily: 'opensans-regular'
  },
  title: {
    fontFamily: 'opensans-semi-bold'
  },
  image: {
    height: 50,
    width: 50
  }
})
