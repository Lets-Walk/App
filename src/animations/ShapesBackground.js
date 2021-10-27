import React from 'react'
import LottieView from 'lottie-react-native'

const ShapesBackground = () => {
  return (
    <LottieView
      source={require('../../assets/animations/shapes-background.json')}
      autoPlay
      loop
    />
  )
}

export default ShapesBackground
