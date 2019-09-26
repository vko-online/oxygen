import React, { useState, useCallback, createRef, ReactNode } from 'react'
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Easing,
  Image,
  SectionList
} from 'react-native'
import { Card } from 'src/data/types'
import CardItem, { cardHeight as ch, cardProportion } from './card'

const cardHeight = ch / cardProportion

function debounce (func, wait, immediate = false) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
interface Props {
  cards?: Card[]
}
export default function Drag ({ cards }: Props) {
  const [dragAnimation] = useState(new Animated.Value(0))
  const [activeIndex, setActive] = useState(cards.length - 1)

  function animate (toValue) {
    dragAnimation.stopAnimation(() => {
      Animated.timing(dragAnimation, {
        duration: 500,
        toValue: toValue,
        easing: Easing.elastic(1),
        useNativeDriver: true
      }).start(() => console.log('animate', toValue))
    })
  }
  const lazyAnimate1 = debounce(() => animate(1), 100)
  const lazyAnimate0 = debounce(() => animate(0), 100)
  function handleMove (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) {
    // const possibleRotationZ = gestureState.y0 + gestureState.dy
    // const normalizedRotationZ = Math.min(maxRotate, Math.max(possibleRotationZ, 0))
    if (gestureState.dy > 0) {
      lazyAnimate1()
    }
    if (gestureState.dy < 0) {
      lazyAnimate0()
    }
  }
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: handleMove,
    // onPanResponderGrant: handlePress,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => true
  })
  const rotateX = dragAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-40deg'],
    extrapolate: 'clamp'
  })
  const opacity = dragAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View style={[s.container]}>
      {/* <SectionList
        d
      /> */}
      {
        cards.map((card, index) => (
          <Animated.View
            {...PanResponder.create({
              onStartShouldSetPanResponder: () => true,
              onStartShouldSetPanResponderCapture: () => true,
              onMoveShouldSetPanResponder: () => true,
              onMoveShouldSetPanResponderCapture: () => true,
              onPanResponderMove: handleMove,
              onPanResponderGrant: () => {
                setActive(index)
              },
              onPanResponderTerminationRequest: () => true,
              onShouldBlockNativeResponder: () => true
            }).panHandlers}
            key={index}
            style={[s.cards, {
              zIndex: index + 1,
              opacity: index === activeIndex ? 1 : opacity,
              transform: [{
                perspective: 700
              },{
                rotateX
              }, {
                scale: dragAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1 - (cards.length - index) * .1],
                  extrapolate: 'clamp'
                })
              }, {
                translateY: dragAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100 * (index + 1)],
                  extrapolate: 'clamp'
                })
              }]
            }]}>
            <CardItem {...card} />
          </Animated.View>
        ))
      }
    </Animated.View>
  )
}

const s = StyleSheet.create({
  container: {
    position: 'relative'
    // height: 280
  },
  activecard: {
    // position: 'absolute',
    // right: 0,
  },
  cards: {
    // position: 'absolute',
    // right: 0
  }
})
