import React, { useState } from 'react'
import { TouchableOpacity, Text, Dimensions } from 'react-native'

const SettingsButton = ({ text, pressFunction }) => {
  const width = Dimensions.get('window').width
  return (
    <TouchableOpacity
      style={{
        width: width * 0.7,
        alignItems: 'center',
        elevation: 4,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        borderRadius: 4,
        backgroundColor: '#ffffff',
        borderColor: 'gray',
      }}
      onPress={pressFunction}
    >
      <Text
        style={{
          fontSize: 20,
          color: '#00248B',
          fontFamily: 'ONEMobileRegular',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
export default SettingsButton
