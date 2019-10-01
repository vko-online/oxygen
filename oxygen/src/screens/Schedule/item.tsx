import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Card, Button, Paragraph, Subheading } from 'react-native-paper'
import { Event } from './data'
import { Transition } from 'react-navigation-fluid-transitions'
import { Category } from 'src/components/StyledText'

interface Props {
  item: Event
  onPress?: (id: Pick<Event, 'id'>) => void
}
export default function EventItem ({ item, onPress }: Props) {
  return (
    <Card style={s.card} onPress={onPress} theme={{ roundness: 5 }}>
        {
          item.images.length > 0 && (
            <Transition shared='image'>
              <Card.Cover source={{ uri: item.images[0].thumbnail }} />
            </Transition>
          )
        }
        <Card.Content>
          <Transition shared='title'>
            <Subheading style={{ marginTop: 10 }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Subheading>
          </Transition>
          <Transition shared='description'>
            <Paragraph numberOfLines={2}>{item.description}</Paragraph>
          </Transition>
          <Transition shared='categories'>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={item.categories}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item: category, index }) => (
                <Category color='#ede' key={index} onPress={() => null}>
                  {category}
                </Category>
              )}
            />
          </Transition>
        </Card.Content>
        <Card.Actions>
          {
            item.reservable && (
              (
                <Transition shared='reserve'>
                  <Button icon='ticket' onPress={() => null}>RESERVE SEAT</Button>
                </Transition>
              )
            )
          }
        </Card.Actions>
      </Card>
  )
}

const s = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginLeft: 60,
    marginBottom: 15,
    alignItems: 'flex-start'
  }
})
