import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'

const IconContainer = ({ backgroundColor, borderColor, children }) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderBottomStartRadius: 60,
        borderBottomEndRadius: 60,
        borderTopLeftRadius: 60,
        width: '17%',
        height: '10%',
        borderWidth: 2,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '135deg' }],
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {children}
    </View>
  )
}

export default IconContainer
