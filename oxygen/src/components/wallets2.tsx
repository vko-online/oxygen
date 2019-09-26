import React, { useState, useCallback, createRef, ReactNode, Fragment } from 'react'
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Easing,
  Image,
  SectionList,
  SectionListRenderItem,
  SectionListRenderItemInfo
} from 'react-native'
import { Subheading, Headline, Title, IconButton } from 'react-native-paper'
import CardItem, { cardHeight as ch, cardProportion } from './card'
import { Wallet, Card as CardInterface, Card } from 'src/data/types'
import { Hpane, Vpane } from 'view-on-steroids'
import { ScrollView } from 'react-native-gesture-handler'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type RenderItem = SectionListRenderItemInfo<CardInterface>
interface Props {
  selectedWalletId: string
  selectedCardId: string
  wallets: Wallet[]
  onSelect?: (walletId: string) => void
}
export default function Wallets ({ wallets, selectedCardId, selectedWalletId, onSelect }: Props) {
  const [expand, setExpand] = useState(new Animated.Value(0))
  const [pan] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const normalizedWallets = wallets.map((wallet) => ({
    title: wallet.title,
    icon: wallet.icon,
    data: wallet.cards
  }))
  const cardCount = normalizedWallets.reduce((a, b) => a + b.data.length, 0)

  const responder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gesture) => true,
    onPanResponderMove: (e, gesture) => {
      pan.y.setValue(gesture.dy)
    },
    onPanResponderRelease: (e, gesture) => {
      Animated.spring(pan, {
        toValue: { x: 0, y: cardCount * 300 },
        friction: 10
      }).start()
    }
  })

  return (
    <ScrollView>
      <Animated.View
        style={[
          s.container,
          {
            height: pan.y.interpolate({
              inputRange: [0, 1],
              outputRange: [300, cardCount * 300]
            })
          }
        ]}
      >
        {
          normalizedWallets.map((wallet, index) => (
            <Animated.View key={index} style={s.item} {...responder.panHandlers}>
              {
                wallet.data.map((card, cardIndex) => (
                  <CardItem
                    key={cardIndex}
                    style={s.item}
                    {...card}
                  />
                ))
              }
            </Animated.View>
          ))
        }
      </Animated.View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10
  },
  item: {
    marginVertical: 10
  }
})
