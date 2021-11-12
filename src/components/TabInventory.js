import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Pressable, View, FlatList } from 'react-native'
import { INVENTORY } from '../constants/walkingmode'
// import IconComponent from './IconComponent'

// const exampleItem = [
//   {
//     type: 'Pencil',
//     quantity: 1,
//   },
//   {
//     type: 'Computer',
//     quantity: 5,
//   },
//   {
//     type: 'Book',
//     quantity: 10,
//   },
//   {
//     type: 'Microscope',
//     quantity: 3,
//   },
//   {
//     type: 'Calculator',
//     quantity: 4,
//   },
//   {
//     type: 'Stethoscope',
//     quantity: 4,
//   },
//   {
//     type: 'Pill',
//     quantity: 7,
//   },
// ]

const TabInventory = ({ inventory, toggleMenu }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.iconConatiner}>
        {/* <IconComponent
          name={item.type}
          badge={item.quantity}
          iconSize={30}
          bgSize={50}
        /> */}
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
          data={inventory}
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
