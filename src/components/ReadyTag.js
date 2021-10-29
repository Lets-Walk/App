import React from 'react'
import { View, Text } from 'react-native'

const ReadyTag = () => {
  return (
    <View
      style={{
        backgroundColor: '#F75646',
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <Text style={{ color: 'white', fontFamily: 'BMHANNAAir_ttf' }}>
        Ready
      </Text>
    </View>
  )
}

export default ReadyTag
