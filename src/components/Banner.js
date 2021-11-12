import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Inventory, Chat } from '../../assets/icons'

const Banner = ({}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}} style={styles.button}>
        <Image source={Inventory} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => {}} style={styles.button}>
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
})
