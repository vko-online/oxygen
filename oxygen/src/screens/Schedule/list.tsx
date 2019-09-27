import React from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  SectionListData
} from 'react-native'
import { Surface, Title, IconButton, Text, Headline, Subheading, Card } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import { Event } from './data'
import moment from 'moment'
import { groupBy } from 'lodash'
import { Hpane, Vpane } from 'view-on-steroids'
import { primary, white } from 'src/constants/Colors'
import { Meta, Category } from 'src/components/StyledText'
import faker from 'faker'

interface RenderItem extends SectionListRenderItemInfo<Event> {}
interface RenderSectionHeader extends SectionListData<Event> {}
interface Props {
  events: Event[]
}
export default function List ({ events }: Props) {
  const groupedEvents = groupBy(events, e => moment(e.date.start).format('DD MMM'))
  const normalizedEvents = Object.keys(groupedEvents).map((title) => ({
    title,
    data: groupedEvents[title]
  }))
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
            <Headline style={{ color: primary, backgroundColor: white, flex: 0 }}>
              {day}
            </Headline>
            <Subheading style={{ fontSize: 12, fontWeight: 'bold', color: primary, backgroundColor: white }}>{month.toUpperCase()}</Subheading>
          </Vpane>
        )
      }}
      renderItem={({ item }: RenderItem) => (
        <Card style={{ marginLeft: 70, marginBottom: 15, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Card.Content>
            <Title>{item.title}</Title>
            {
              item.reservable && (
                <Meta icon='card-giftcard'>
                  RESERVE SEAT
                </Meta>
              )
            }
            <Meta icon='location-city'>
              {item.address}
            </Meta>
            <Hpane justifyContent='flex-start' alignItems='center'>
              {
                item
                  .categories
                  .map((category, index) => (
                    <Category color='#ede' key={index}>
                      {category}
                    </Category>
                  ))
              }
            </Hpane>
          </Card.Content>
        </Card>
      )}
    />
  )
}
