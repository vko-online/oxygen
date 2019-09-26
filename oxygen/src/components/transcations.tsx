import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  Animated,
  Easing
} from 'react-native'
import {
  Caption,
  Text,
  Subheading,
  Title
} from 'react-native-paper'
import moment from 'moment'
import { Transaction, Card } from 'src/data/types'
import { groupBy } from 'lodash'

const categoryMap = {
  transport: require('./bus.png'),
  movie: require('./movie.png'),
  cafe: require('./cafe.png')
  // shop: require('./shop.png')
}

interface Props {
  list: Transaction[]
}
export default function Transactions ({ list }: Props) {
  const normalizedObject = groupBy(list, v => moment(v.date).format('DD MMM, ddd'))
  const normalizedList = Object.keys(normalizedObject).map(key => ({
    title: key,
    data: normalizedObject[key]
  }))
  const initialPosition = { x: 10, y: 0 }

  const [opacityAnimation] = useState(new Animated.Value(0))
  const [moveAnimation] = useState(new Animated.ValueXY(initialPosition))

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(moveAnimation, {
        toValue: {
          x: 0,
          y: 0
        },
        duration: 500,
        easing: Easing.out(Easing.ease)
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 200
      })
    ]).start()

    return () => {
      opacityAnimation.setValue(0)
      moveAnimation.setValue(initialPosition)
    }
  })

  return (
    <SectionList
      renderItem={({ item: {
        title,
        amount,
        category,
        date
      } }) => (
        <Animated.View style={[s.container, { opacity: opacityAnimation, transform: moveAnimation.getTranslateTransform() }]}>
          <Image source={categoryMap[category]} style={s.image} />
          <View style={s.text}>
            <Subheading style={s.title}>{title}</Subheading>
            <Caption>{moment(date).format('HH:MM')}</Caption>
          </View>
          <Subheading style={s.amount}>₸{amount.toLocaleString()}</Subheading>
        </Animated.View>
      )}
      sections={normalizedList}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { title } }) => (
        <Animated.View style={{ opacity: opacityAnimation }}>
          <Subheading>{title}</Subheading>
        </Animated.View>
      )}
      style={{ marginHorizontal: 10 }}
      keyExtractor={(item, index) => `${index}`}
      ItemSeparatorComponent={() => <View style={s.separator} />}
    />
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    margin: 10
  },
  text: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  },
  amount: {
    padding: 10,
    fontWeight: 'bold',
    color: '#575979'
  },
  separator: {
    marginVertical: 4,
    height: 1,
    width: '100%',
    backgroundColor: '#eee'
  }
})
