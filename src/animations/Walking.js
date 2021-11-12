import React from 'react'
import LottieView from 'lottie-react-native'

const Walking = () => {
  return (
    <LottieView
      source={require('../../assets/animations/walking.json')}
      autoPlay
      loop
      style={{ flex: 1, marginBottom: 10, marginTop: 30 }}
    />
  )
}

export default Walking
