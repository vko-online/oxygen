import React, { useRef } from 'react'
import { View, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import Layout from 'src/constants/Layout'

interface CarouselImage {
  title?: string
  thumbnail: string
}
interface Props {
  images: CarouselImage[]
}
export default function ImageCarousel ({ images }: Props) {
  const carouselRef = useRef(null)

  const goForward = () => {
    carouselRef.current.snapToNext()
  }

  function renderItem ({ item, index }, parallaxProps) {
    return (
      <View style={s.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={s.imageContainer}
          style={s.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    )
  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={Layout.window.width}
        sliderHeight={Layout.window.width}
        itemWidth={Layout.window.width - 60}
        data={this.state.entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    width: Layout.window.width - 60,
    height: Layout.window.width - 60
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  }
})
