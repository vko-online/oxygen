import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList
} from 'react-native'
import { groupBy } from 'lodash'
import moment from 'moment'
import { Transaction, Card } from 'src/data/types'
import Month, { MonthItem } from './month'

interface RenderItem {
  item: MonthItem
  index: number
}
interface Props {
  list: MonthItem[]
  onSelect: (month) => void
  activeMonth: string
}
export default function Months ({ list, onSelect, activeMonth }: Props) {
  const monthListRef = useRef<FlatList<any>>(null)
  const initialIndex = list.findIndex(v => v.title === activeMonth)
  useEffect(() => {
    monthListRef.current.scrollToIndex({ animated: true, index: initialIndex })
  }, [])
  return (
    <FlatList
      extraData={{}}
      style={{ height: 120 }}
      contentContainerStyle={{ alignItems: 'center' }}
      getItemLayout={(data, index) => ({ length: 160, offset: 160 * index, index })}
      ref={monthListRef}
      snapToInterval={160}
      pagingEnabled
      renderItem={({ item, index }: RenderItem) => {
        return (
          <Month
            active={activeMonth === item.title}
            onPress={() => {
              onSelect(item.title)
              monthListRef.current.scrollToIndex({
                animated: true,
                index
              })
            }}
            title={item.title}
            amount={item.amount}
          />
        )
      }}
      data={list}
      horizontal
      showsHorizontalScrollIndicator
      keyExtractor={(item, index) => `${index}`}
    />
  )
}
