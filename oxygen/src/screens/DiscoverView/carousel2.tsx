import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Swiper from 'react-native-web-swiper'
import Layout from 'src/constants/Layout'

interface CarouselImage {
  title?: string
  thumbnail: string
}
interface Props {
  images: CarouselImage[]
}
export default function Carousel ({ images }: Props) {
  return (
    <Swiper
      containerStyle={{ zIndex: 0, maxHeight: 200 }}
      controlsProps={{
        prevTitle: '←',
        nextTitle: '→',
        dotsTouchable: false,
        dotsPos: 'bottom',
        prevPos: 'bottom-left',
        nextPos: 'bottom-right',
        prevTitleStyle: {
          color: '#fff',
          fontSize: 20
        },
        nextTitleStyle: {
          color: '#fff',
          fontSize: 20
        }
      }}
    >
      {
        images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.thumbnail, cache: 'force-cache' }}
            style={s.container}
          />
        ))
      }
    </Swiper>
  )
}

const s = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: 200
  }
})
