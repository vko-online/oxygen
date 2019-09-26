
import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutRectangle,
  Dimensions
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Card, CardTypes, VendorTypes } from 'src/data/types'
import Triangulr, { kaspi, halybank } from './tri'
import { Hpane, Vpane } from 'view-on-steroids'
import { extraExtraLightGray, extraLightGray, lightGray } from 'src/constants/Colors'
import { memoize } from 'lodash'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export const cardWidth = 8560 / 1.1
export const cardHeight = 5398 / 1.1
export const cardBorderRadius = 20
export const cardProportion = 17

export const vendorMap = {
  visa: require('payment-icons/min/single/visa.svg'),
  mastercard: require('payment-icons/min/single/mastercard-old.svg')
}
const renderMap = {
  kaspi,
  halybank
}

function CardSkeleton () {
  const [animation] = useState(new Animated.Value(0))

  const runAnimation = useCallback(() => {
    Animated.loop(
      Animated.timing(animation , {
        toValue: 1,
        duration: 3000
      })
    ).start()
  }, [animation])

  useEffect(() => {
    runAnimation()
    return () => {
      animation.stopAnimation()
    }
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [extraLightGray, lightGray, extraLightGray]
  })

  return (
    <View style={s.cardSkeleton}>
      <Vpane position='absolute' top={0} right={0} bottom={0} left={0} alignItems='stretch' flex={1} justifyContent='space-between'>
        <Vpane padding={30}>
          <Animated.View style={{ backgroundColor, height: 30, width: 200 }} />
          <Animated.View style={{ backgroundColor, height: 30, width: 100, marginTop: 20 }} />
        </Vpane>
        <Hpane alignItems='center' padding={30}>
          <Animated.View style={{ backgroundColor, height: 30, flex: .5 }} />
          <Animated.View style={{ backgroundColor, height: 40, width: 60 }} />
        </Hpane>
      </Vpane>
    </View>
  )
}

function genSvg (layout: LayoutRectangle, bankCode) {
  const tri = new Triangulr(layout.width, layout.width * 58 / 100, 140, 30, renderMap[bankCode])
  const svg = tri.generate()
  return svg
}

const generateSvg = memoize(genSvg)

interface Props extends Card {
  style?: StyleProp<ViewStyle>
  index?: number
  onPress?: () => void
}
function CardItem ({
  bankCode,
  bankName,
  cardType = CardTypes.DEBIT,
  last4Digits,
  vendor = VendorTypes.MASTERCARD,
  style,
  onPress,
  index
}: Props) {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT
  })
  const vendorImage = vendorMap[vendor]

  // let content
  // if (layout) {
  //   const svg = generateSvg(layout, bankCode)
  //   content = (
  //     <View style={[s.card, style]}>
  //       <View style={s.cardBackground}>
  //         {svg}
  //       </View>
  //       <Vpane position='absolute' top={0} right={0} bottom={0} left={0} alignItems='stretch' flex={1} justifyContent='space-between'>
  //         <Vpane padding={30}>
  //           <Text style={s.bankName}>{index} - {bankName}</Text>
  //           <Text style={s.cardType}>{cardType}</Text>
  //         </Vpane>
  //         <Hpane alignItems='center' padding={30}>
  //           <Text style={s.cardNumber}>•••• {last4Digits}</Text>
  //           <Image source={vendorImage} style={s.vendor} />
  //         </Hpane>
  //       </Vpane>
  //     </View>
  //   )
  // } else {
  //   content = <CardSkeleton />
  // }

  const svg = generateSvg(layout, bankCode)

  return (
    <View onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}>
      <View style={[s.card, style]}>
        <View style={s.cardBackground}>
          {svg}
        </View>
        <Vpane position='absolute' top={0} right={0} bottom={0} left={0} alignItems='stretch' flex={1} justifyContent='space-between'>
          <Vpane padding={30}>
            <Text style={s.bankName}>{index} - {bankName}</Text>
            <Text style={s.cardType}>{cardType}</Text>
          </Vpane>
          <Hpane alignItems='center' padding={30}>
            <Text style={s.cardNumber}>•••• {last4Digits}</Text>
            <Image source={vendorImage} style={s.vendor} />
          </Hpane>
        </Vpane>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  cardSkeleton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: extraExtraLightGray,
    paddingBottom: '58%',
    borderRadius: cardBorderRadius,
    position: 'relative'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: extraExtraLightGray,
    paddingBottom: '58%',
    borderRadius: cardBorderRadius,
    position: 'relative',
    overflow: 'hidden'
  },
  cardBackground: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    position: 'absolute'
  },
  bankName: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 32
  },
  cardType: {
    color: '#ccc',
    fontSize: 20,
    fontWeight: '400'
  },
  cardNumber: {
    color: '#eee',
    fontSize: 24,
    fontWeight: '500',
    textAlignVertical: 'center'
  },
  vendor: {
    width: 72,
    height: 55,
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

export default React.memo(CardItem)
