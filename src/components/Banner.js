import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Inventory, Chat, New } from '../../assets/icons'

const Banner = ({ toggleInventory, invBadge, toggleChat, chatBadge }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleInventory} style={styles.button}>
        {invBadge ? <Image source={New} style={styles.newBadge} /> : <></>}
        <Image source={Inventory} style={styles.icon} />
      </Pressable>
      <Pressable onPress={toggleChat} style={styles.button}>
        <Image source={Chat} style={styles.icon} />
      </Pressable>
    </View>
  )
}

export default React.memo(Banner)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  newBadge: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: -3,
  },
})
