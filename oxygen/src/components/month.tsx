import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export interface MonthItem {
  title: string
  amount: number
}
interface Props extends MonthItem {
  active?: boolean
  onPress?: () => void
}
export function MonthEmpty () {
  return <View style={s.container} />
}
export default function Month ({ title, amount, active, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.container, active && s.containerActive]}>
      <Text style={[s.month, active && s.monthActive]}>{title}</Text>
      <Text style={[s.count, active && s.countActive]}>₸{amount.toLocaleString()}</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: {
    opacity: 0.7,
    width: 160,
    marginHorizontal: 10
  },
  containerActive: {
    opacity: 1
  },
  month: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '500'
  },
  monthActive: {
    fontSize: 18
  },
  count: {
    fontWeight: '700',
    fontSize: 28,
    color: '#575979'
  },
  countActive: {
    fontSize: 34
  }
})
