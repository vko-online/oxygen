import React, { useState } from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { Appbar, Searchbar, Chip } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Page from 'src/components/Page'
import { white, darkGray } from 'src/constants/Colors'
import { find, categories } from 'src/screens/Discover/data'
import { categoryIcon } from 'src/components/StyledText'
import CardItemMinimal from 'src/screens/Discover/item.minimal'
import Layout from 'src/constants/Layout'

const events = find()

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const [query, setQuery] = useState(null)
  const [selectedCategories, setCategories] = useState<string[]>([])
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
    <Page justifyContent='flex-start' flex={1}>
      <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
        <Searchbar
          placeholder='Search'
          style={s.search}
          onChangeText={(text) => setQuery(text)}
        />
        <Appbar.Action icon='close' color={darkGray} onPress={() => navigation.goBack(null)} />
      </Appbar.Header>
      <FlatList
        style={{ flexGrow: 0, margin: 10 }}
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
        contentContainerStyle={{ flex: 1, flexGrow: 1, justifyContent: 'flex-start' }}
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
              source={require('src/assets/images/empty.jpg')}
              style={s.emptyImage}
              resizeMode='cover'
            />
          </View>
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </Page>
  )
}

Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  search: {
    flex: 1,
    flexGrow: 1,
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
