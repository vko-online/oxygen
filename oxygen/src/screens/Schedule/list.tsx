import React from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
  StyleSheet,
  FlatList,
  Image
} from 'react-native'
import { Button, Title, IconButton, Text, Headline, Subheading, Card, Paragraph, Searchbar } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Transition } from 'react-navigation-fluid-transitions'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import { Event } from './data'
import moment from 'moment'
import { groupBy } from 'lodash'
import { Hpane, Vpane } from 'view-on-steroids'
import { primary, white } from 'src/constants/Colors'
import { Address, Category } from 'src/components/StyledText'
import faker from 'faker'

interface RenderItem extends SectionListRenderItemInfo<Event> {}
interface RenderSectionHeader extends SectionListData<Event> {}
interface Props {
  events: Event[]
  navigation: NavigationScreenProp<any, any>
}
export default function List ({ events, navigation }: Props) {
  const groupedEvents = groupBy(events, e => moment(e.date.start).format('DD MMM'))
  const normalizedEvents = Object.keys(groupedEvents).map((title) => ({
    title,
    data: groupedEvents[title]
  }))

  function handlePress (id) {
    navigation.navigate('ScheduleView', { id })
  }
  return (
    <SectionList
      style={{ padding: 10 }}
      stickyHeaderIndices={[0]}
      sections={normalizedEvents}
      stickySectionHeadersEnabled
      keyExtractor={(item, index) => item.id}
      renderSectionHeader={({ section: { title } }) => {
        const date = title.split(' ')
        const day = date[0]
        const month = date[1]
        return (
          <Vpane backgroundColor={white} paddingHorizontal={15} position='absolute' top={0} left={0} alignItems='center'>
            <Headline style={s.headline}>
              {day}
            </Headline>
            <Subheading style={{ fontSize: 12, fontWeight: 'bold', color: primary, backgroundColor: white }}>{month.toUpperCase()}</Subheading>
          </Vpane>
        )
      }}
      renderItem={({ item }: RenderItem) => (
        <Card style={s.card} onPress={() => handlePress(item.id)} theme={{ roundness: 5 }}>
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
      )}
    />
  )
}

const s = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginLeft: 60,
    marginBottom: 15,
    alignItems: 'flex-start'
  },
  headline: {
    color: primary,
    backgroundColor: white,
    flex: 0
  }
})
