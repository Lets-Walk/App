import React from 'react'
import { StyleSheet, Pressable, View, FlatList } from 'react-native'
import { PAPER } from '../constants/walkingmode'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import IconComponent from './IconComponent'

const examplePaper = [
  {
    type: '공과대학',
    quantity: 1,
  },
  {
    type: '자연과학대학',
    quantity: 5,
  },
  {
    type: '인문대학',
    quantity: 10,
  },
  {
    type: '경영대학',
    quantity: 4,
  },
  {
    type: '의과대학',
    quantity: 6,
  },
  {
    type: '약학대학',
    quantity: 3,
  },
]

const TabPaper = ({ toggleMenu }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.iconConatiner}>
        <IconComponent
          name={item.type}
          badge={item.quantity}
          iconSize={18}
          bgSize={60}
          text
        />
      </View>
    )
  }

  return (
    <>
      <Pressable style={styles.backButton} onPress={() => toggleMenu(PAPER)}>
        <Ionicons name="chevron-back" size={30} color="gray" />
      </Pressable>
      <View style={styles.listContainer}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={examplePaper}
          renderItem={renderItem}
          keyExtractor={(item) => item.type}
          contentContainerStyle={{ paddingRight: 35 }}
        />
      </View>
    </>
  )
}

export default React.memo(TabPaper)

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
    marginTop: 12,
    marginRight: 10,
  },
})
