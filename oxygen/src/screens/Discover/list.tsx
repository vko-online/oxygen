import React from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet
} from 'react-native'
import { Headline, Subheading } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Event } from './data'
import moment from 'moment'
import { groupBy } from 'lodash'
import { Vpane } from 'view-on-steroids'
import { primary, white } from 'src/constants/Colors'
import CardItem from './item'

interface RenderItem extends SectionListRenderItemInfo<Event> {}
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
    navigation.navigate('DiscoverView', { id })
  }
  return (
    <SectionList
      style={{ padding: 10 }}
      stickyHeaderIndices={[0]}
      sections={normalizedEvents}
      stickySectionHeadersEnabled
      keyExtractor={(item) => item.id}
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
        <CardItem item={item} onPress={() => handlePress(item.id)} />
      )}
    />
  )
}

const s = StyleSheet.create({
  headline: {
    color: primary,
    backgroundColor: white,
    flex: 0
  }
})
