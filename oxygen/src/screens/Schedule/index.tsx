import React, { useState } from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'
import { Text, Title, Appbar, Searchbar, TextInput, Chip } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Modal from 'modal-react-native-web'
import Tabs from 'src/components/ant/Tabs'
import Header from 'src/components/Header'
import Page from 'src/components/Page'
import UpcomingScene from './scene.upcoming'
import TodayScene from './scene.today'
import PastScene from './scene.past'

import List from './list'

import { find, categories } from './data'
import { darkGray, primary } from 'src/constants/Colors'
import { categoryIcon } from 'src/components/StyledText'

import CardItemMinimal from './item.minimal'
import Layout from 'src/constants/Layout'

const events = find()
interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const [query, setQuery] = useState(null)
  const [modalVisible, setVisiblity] = useState(false)
  const [selectedCategories, setCategories] = useState<string[]>([])
  const tabs = [
    { title: 'Discover' },
    { title: 'Following' }
    // { title: 'Upcoming' }
  ]

  const hasFilter = query || selectedCategories.length
  const filteredEvents = hasFilter && [
    ...events.filter(v => v.title.includes(query)),
    ...events.filter(v => v.description.includes(query)),
    ...events.filter(v => v.categories.every(c => selectedCategories.includes(c)))
  ].reduce((all, next) => {
    const exist = all.find(v => v.id === next.id)
    if (!exist) {
      all.push(next)
    }
    return all
  }, [])

  return (
    <Page>
      <Header title='Schedule'>
        <Appbar.Action icon='filter' color={darkGray} onPress={() => setVisiblity(true)} />
      </Header>
      <Tabs tabs={tabs} initialPage={0}>
        <List events={events} navigation={navigation} />
        <PastScene />
        {/* <UpcomingScene /> */}
      </Tabs>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setVisiblity(false)}>
        <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
          <Searchbar
            placeholder='Search'
            style={s.search}
            onChangeText={(text) => setQuery(text)}
          />
          <Appbar.Action icon='close' color={darkGray} onPress={() => setVisiblity(false)} />
        </Appbar.Header>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ margin: 10, flexGrow: 0 }}
            data={categories}
            extraData={selectedCategories}
            keyExtractor={(item, index) => `${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Chip
                style={{ marginRight: 10 }}
                // selectedColor={primary}
                icon={() => categoryIcon(item)}
                selected={selectedCategories.includes(item)}
                onClose={selectedCategories.includes(item) && (
                  () => {
                    const index = selectedCategories.indexOf(item)
                    setCategories([
                      ...selectedCategories.slice(0, index),
                      ...selectedCategories.slice(index + 1)
                    ])
                  }
                )}
                onPress={() => {
                  if (selectedCategories.includes(item)) {
                    const index = selectedCategories.indexOf(item)
                    setCategories([
                      ...selectedCategories.slice(0, index),
                      ...selectedCategories.slice(index + 1)
                    ])
                  } else {
                    setCategories([
                      ...selectedCategories,
                      item
                    ])
                  }
                }}
              >
                {item}
              </Chip>
            )}
          />
          <FlatList
            contentContainerStyle={{ flex: 1, flexGrow: 1, justifyContent: 'center' }}
            style={{ flex: 1, flexGrow: 1 }}
            data={filteredEvents}
            renderItem={({ item }) => (
              <CardItemMinimal
                item={item}
                onPress={() => null}
                style={{ margin: 5 }}
              />
            )}
            ListEmptyComponent={(
              <View style={s.empty}>
                <Image
                  source={require('./empty.jpg')}
                  style={s.emptyImage}
                  resizeMode='cover'
                />
              </View>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </Modal>
    </Page>
  )
}
Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  search: {
    flex: 1,
    elevation: 0,
    backgroundColor: '#fff'
  },
  empty: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImage: {
    width: Layout.window.width,
    height: 300,
    alignSelf: 'center',
    opacity: 0.8
  }
})
