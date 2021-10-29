import React from 'react'
import { View } from 'react-native'

const IconContainer = ({ backgroundColor, children, bgSize }) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderBottomStartRadius: bgSize,
        borderBottomEndRadius: bgSize,
        borderTopLeftRadius: bgSize,
        width: bgSize,
        height: bgSize,
        borderWidth: 2,
        borderColor: 'black',
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
        elevation: 0,
      }}
    >
      {children}
    </View>
  )
}

export default IconContainer
