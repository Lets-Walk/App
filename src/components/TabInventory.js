import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Pressable, View, FlatList } from 'react-native'
import { INVENTORY } from '../constants/walkingmode'
import IconComponent from './IconComponent'

const exampleItem = [
  {
    type: 'Pencil',
    quantity: 2,
  },
  {
    type: 'Computer',
    quantity: 2,
  },
  {
    type: 'Book',
    quantity: 2,
  },
  {
    type: 'Microscope',
    quantity: 2,
  },
  {
    type: 'Calculator',
    quantity: 2,
  },
  {
    type: 'Stethoscope',
    quantity: 2,
  },
  {
    type: 'Pill',
    quantity: 2,
  },
]

const TabInventory = ({ toggleMenu }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.iconConatiner}>
        <IconComponent name={item.type} size={30} bgSize="normal" />
      </View>
    )
  }

  return (
    <>
      <Pressable
        style={styles.backButton}
        onPress={() => toggleMenu(INVENTORY)}
      >
        <Ionicons name="chevron-back" size={30} color="gray" />
      </Pressable>
      <View style={styles.listContainer}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={exampleItem}
          renderItem={renderItem}
          keyExtractor={(item) => item.type}
          contentContainerStyle={{ paddingRight: 35 }}
        />
      </View>
    </>
  )
}

export default React.memo(TabInventory)

const styles = StyleSheet.create({
  backButton: {
    left: '2%',
    transform: [{ rotate: '90deg' }],
  },
  listContainer: {
    height: '100%',
    width: '100%',
    marginLeft: '2%',
  },
  iconConatiner: {
    flex: 1,
    height: '100%',
    marginTop: 7,
    marginRight: 10,
  },
})
