import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'

const IconContainer = ({ backgroundColor, borderColor, children, size }) => {
  let width, height
  if (size == 'normal') {
    width = 50
    height = 50
  } else if (size == 'small') {
    width = 40
    height = 40
  } else if (size == 'large') {
    width = 60
    height = 60
  }

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderBottomStartRadius: 60,
        borderBottomEndRadius: 60,
        borderTopLeftRadius: 60,
        width: width,
        height: height,
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
