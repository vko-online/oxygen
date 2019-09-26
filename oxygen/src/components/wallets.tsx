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

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type RenderItem = SectionListRenderItemInfo<CardInterface>
interface Props {
  selectedWalletId: string
  selectedCardId: string
  wallets: Wallet[]
  onSelect?: (walletId: string) => void
}
export default function Wallets ({ wallets, selectedCardId, selectedWalletId, onSelect }: Props) {
  const [expanded, setExpand] = useState(false)
  const [pan] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const [opacityStagger] = useState(new Animated.Value(0))

  const responder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gesture) => true,
    onPanResponderMove: (e, gesture) => {
      if (gesture.dy > 0) {
        const val = Math.max(0, Math.min(120, gesture.dy))
        pan.y.setValue(val)
      } else {
        if (expanded) {
          pan.y.setValue(100 - Math.min(100, Math.abs(gesture.dy)))
        } else {
          pan.y.setValue(Math.max(gesture.dy, 0))
        }
      }
    },
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy > 25) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 100 },
          friction: 10
        }).start(() => setExpand(true))
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 10
        }).start(() => setExpand(false))
      }
    }
  })

  const normalizedWallets = wallets.map((wallet) => ({
    title: wallet.title,
    icon: wallet.icon,
    data: wallet.cards.sort((a, b) => {
      return a.id === selectedCardId ? 1 : -1
    }).concat([{
      id: 'HEADLINE',
      bankCode: null,
      bankName: null,
      cardType: null,
      last4Digits: null,
      transactions: [],
      vendor: null
    }])
  }))
  const cardCount = normalizedWallets.reduce((a, b) => a + b.data.length, 0)
  pan.addListener(({ y }) => {
    Animated.stagger(3, [
      Animated.timing(opacityStagger, {
        toValue: y > 60 ? 1 : 0,
        duration: 100
      })
    ]).start()
  })

  return (
    <AnimatedSectionList
      sections={normalizedWallets}
      style={[s.list, {
        height: pan.y.interpolate({
          inputRange: [0, 100],
          outputRange: [200, 300 + cardCount * 320]
        }),
        marginTop: pan.y.interpolate({
          inputRange: [0, 100],
          outputRange: [-140, -70]
        })
      }]}
      renderItem={({ item, index, section }: RenderItem) => {
        if (item.id === 'HEADLINE') {
          return (
            <Animated.View
              style={{
                opacity: pan.y.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: [0, 0, 1]
                }),
                marginTop: -(section.data.length * 20),
                marginBottom: 200,
                zIndex: 15
              }}>
              <Hpane justifyContent='flex-start' alignItems='center'>
                <IconButton icon={section.icon} />
                <Title>{section.title}</Title>
              </Hpane>
            </Animated.View>
          )
        }
        const initialOpacity = item.id === selectedCardId ? 1 : opacityStagger
        return (
          <Animated.View
            {...responder.panHandlers}
            style={{
              top: pan.y,
              backgroundColor: item.id === selectedCardId && 'blue',
              height: 60,
              marginTop: 10,
              opacity: initialOpacity,
              zIndex: index * 10 + 10,
              transform: [
                {
                  perspective: 500
                },
                {
                  rotateX: pan.y.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0deg', '-30deg']
                  })
                },
                ...pan.getTranslateTransform()
              ]
            }}
          >
            <CardItem
              {...item}
            />
          </Animated.View>
        )
      }}
      keyExtractor={(item: Card) => item.id}
    />
  )
}

const s = StyleSheet.create({
  container: {
    position: 'relative'
  },
  list: {
    zIndex: 10,
    position: 'relative',
    padding: 20,
    marginLeft: 100,
    marginRight: -100
  }
})
