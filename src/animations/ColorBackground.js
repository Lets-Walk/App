import React from 'react'
import LottieView from 'lottie-react-native'

const ColorBackground = () => {
  return (
    <LottieView
      source={require('../../assets/animations/color-background.json')}
      autoPlay
      resizeMode="cover"
      loop={false}
    />
  )
}

export default ColorBackground
