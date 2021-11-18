import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'

const BasicButton = ({ text, pressFunction }) => {
  return (
    <TouchableOpacity
      style={{
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        borderRadius: 50,
        backgroundColor: '#37688B',
        elevation: 5,
        borderWidth: 0,
        fontFamily: 'BMHANNAAir_ttf',
      }}
      onPress={pressFunction}
    >
      <Text
        style={{
          fontSize: 25,
          color: 'white',
          fontFamily: 'BMHANNAAir_ttf',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
export default BasicButton
