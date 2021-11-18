import React, { useState } from 'react'
import { TouchableOpacity, Text, Dimensions, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

const SettingsButton = ({ text, pressFunction }) => {
  const width = Dimensions.get('window').width
  return (
    <TouchableOpacity
      style={{
        width: width * 0.8,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderColor: '#989898',
        borderBottomWidth: 1,
        flexDirection: 'row',
      }}
      onPress={pressFunction}
    >
      <Text
        style={{
          fontSize: 24,
          color: 'black',
          fontFamily: 'ONEMobileRegular',
        }}
      >
        {text}
      </Text>
      <View style={{ position: 'absolute', right: 5 }}>
        <FontAwesomeIcon name="chevron-right" color="#001d40" size={15} />
      </View>
    </TouchableOpacity>
  )
}
export default SettingsButton
