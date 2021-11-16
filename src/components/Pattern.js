import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Pattern = ({ pattern }) => {
  return (
    <View style={styles.pattern}>
      <Image source={pattern} style={styles.patternSize} />
    </View>
  )
}

export default React.memo(Pattern)

const styles = StyleSheet.create({
  pattern: {
    flex: 1,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternSize: {
    width: 30,
    height: 30,
  },
})
