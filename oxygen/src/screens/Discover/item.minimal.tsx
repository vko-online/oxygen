import React from 'react'
import { StyleSheet, FlatList, ViewStyle } from 'react-native'
import { Card, Paragraph, Subheading, Title } from 'react-native-paper'
import { Event } from './data'
import { Category } from 'src/components/StyledText'

interface Props {
  item: Event
  onPress?: (id: Pick<Event, 'id'>) => void
  style?: ViewStyle
}
export default function EventItem ({ item, onPress, style }: Props) {
  return (
    <Card style={[s.card, style]} onPress={onPress} theme={{ roundness: 5 }}>
        <Card.Content style={{ overflow: 'hidden' }}>
          <Subheading>{item.title}</Subheading>
          <Paragraph numberOfLines={1}>{item.description}</Paragraph>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={item.categories}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item: category, index }) => (
              <Category color='#ede' key={index}>
                {category}
              </Category>
            )}
          />
        </Card.Content>
      </Card>
  )
}

const s = StyleSheet.create({
  card: {
    overflow: 'hidden',
    alignItems: 'flex-start'
  }
})
