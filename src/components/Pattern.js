import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const Pattern = ({ pattern }) => {
  return (
    <View style={styles.pattern}>
      <SvgXml xml={pattern} width={30} height={30} />
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
})
