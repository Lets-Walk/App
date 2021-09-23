/**
 * Sample Code
 * https://github.com/Lets-Walk/App
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>걷고 땅 먹고</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 35,
  },
})

export default App
