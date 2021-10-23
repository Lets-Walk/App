import { Button } from '@ant-design/react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, Pressable, View } from 'react-native'
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
  return (
    <>
      <Pressable
        style={styles.backButton}
        onPress={() => toggleMenu(INVENTORY)}
      >
        <Ionicons name="chevron-back" size={30} color="gray" />
      </Pressable>
      <View
        style={{
          height: '100%',
          width: '100%',
          marginLeft: '2%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {exampleItem.map((item, index) => {
          return (
            <View key={item.type} style={styles.iconConatiner}>
              <IconComponent name={item.type} size={30} bgSize="normal" />
            </View>
          )
        })}
      </View>
    </>
  )
}

export default React.memo(TabInventory)

const styles = StyleSheet.create({
  backButton: {
    // position: 'absolute',
    left: '2%',
    transform: [{ rotate: '90deg' }],
  },
  iconConatiner: {
    height: '100%',
    marginTop: 10,
    marginRight: '2%',
  },
})
