import React from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
  StyleSheet,
  FlatList
} from 'react-native'
import { Button, Title, IconButton, Text, Headline, Subheading, Card } from 'react-native-paper'
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
        <Card style={s.card} onPress={() => handlePress(item.id)}>
          <Card.Content>
            <Transition shared='title'>
              <Headline>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Headline>
            </Transition>
            <Transition shared='address'>
              <Address icon='map'>
                {item.address}
              </Address>
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
    marginLeft: 70,
    marginBottom: 15,
    alignItems: 'flex-start'
  },
  headline: {
    color: primary,
    backgroundColor: white,
    flex: 0
  }
})
