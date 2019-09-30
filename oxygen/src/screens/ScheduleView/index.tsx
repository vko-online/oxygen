import React from 'react'
import { FlatList } from 'react-native'
import { Text, Title, Paragraph, Subheading, Button, Theme, Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Transition } from 'react-navigation-fluid-transitions'
import Header, { HeaderWithBack } from 'src/components/Header'
import Page from 'src/components/Page'
import { findById } from 'src/screens/Schedule/data'
import { Address, Category, EventDate } from 'src/components/StyledText'
import Pane, { Hpane } from 'view-on-steroids'
import moment from 'moment'
import Divider from './divider'
import Carousel from './carousel2'

const FORMAT = 'ddd. MMM DD, HH:MM'

interface NavState {
  id: string
}
interface Props {
  navigation: NavigationScreenProp<NavState, NavState>
}
export default function Screen ({ navigation }: Props) {
  const event = findById(navigation.state.params.id)
  if (!event) {
    navigation.navigate('Schedule')
    return null
  }

  const startDate = moment(event.date.start)
  let eventDate = startDate.format(FORMAT)
  const endDate = event.date.end && moment(event.date.end)
  if (endDate) {
    eventDate += `${endDate && endDate.format(' - HH:MM')}`
  }
  return (
    <Page>
      <HeaderWithBack title={event.title} />
      <Carousel images={event.images} />
      <Pane paddingHorizontal={20} paddingTop={10}>
        <Transition shared='title'>
          <Headline>{event.title.charAt(0).toUpperCase() + event.title.slice(1)}</Headline>
        </Transition>
        <Divider />
        <Paragraph>{event.description}</Paragraph>
        <Divider />
        <EventDate labelStyle={{ fontSize: 14 }}>
          {eventDate}
        </EventDate>
        {/* <Subheading style={{ fontWeight: '600' }}>
          {moment(event.date.start).format('ddd. MMM DD, HH:MM')}
          {event.date.end && moment(event.date.end).format(' - HH:MM')}
        </Subheading> */}
        <Divider />
        <Transition shared='address'>
          <Address icon='map' onPress={() => null}>
            {event.address}
          </Address>
        </Transition>
        <Divider />
        <Transition shared='categories'>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={event.categories}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <Category color='#ede' key={index} onPress={() => null}>
                {item}
              </Category>
            )}
          />
        </Transition>
        <Divider />
        <Hpane alignItems='center' justifyContent='flex-start'>
          {
            event.reservable && (
              <Transition shared='reserve'>
                <Button
                  icon='ticket'
                  mode='contained'
                  dark
                  onPress={() => null}
                  theme={actionTheme}
                >
                  RESERVE SEAT
                </Button>
              </Transition>
            )
          }
        </Hpane>
      </Pane>
    </Page>
  )
}
Screen.navigationOptions = {
  header: null
}

const actionTheme: Pick<Theme, 'roundness'> = {
  roundness: 4
}
