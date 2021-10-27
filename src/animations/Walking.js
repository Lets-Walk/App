import React from 'react'
import LottieView from 'lottie-react-native'

const Walking = () => {
  return (
    <LottieView
      source={require('../../assets/animations/walking.json')}
      autoPlay
      loop
    />
  )
}

export default Walking
