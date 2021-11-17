import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native'
import GetMarkerImage from '../utils/getMarkerImage'

const priority = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']

const ItemList = ({ items }) => {
  const [sortedItems, setItems] = useState([])

  useEffect(() => {
    const sorted = items.sort((a, b) => {
      return (
        priority.indexOf(a[a.length - 1]) - priority.indexOf(b[b.length - 1])
      )
    })
    setItems(sorted)
  }, [items])

  const renderItem = ({ item }) => {
    return (
      <Image
        source={GetMarkerImage(item)}
        style={{
          width: 46,
          height: 46,
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingRight: 10 }}
      />
    </View>
  )
}

export default React.memo(ItemList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
})
