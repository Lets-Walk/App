import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const IconBadge = ({ num }) => {
  if (parseInt(num) > 9) num = '9+'

  return (
    <View style={styles.container}>
      <View style={styles.badgeStyle}>
        <Text style={styles.textStyle}>{num}</Text>
      </View>
    </View>
  )
}

export default IconBadge

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    elevation: 100,
    right: -5,
  },
  badgeStyle: {
    width: 19,
    height: 19,
    borderRadius: 19,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: { color: 'white', bottom: 1 },
})
