import React from 'react'
import LottieView from 'lottie-react-native'

const Confetti = () => {
  return (
    <LottieView
      source={require('../../assets/animations/confetti.json')}
      autoPlay
      resizeMode="cover"
      loop
    />
  )
}

export default Confetti
