import React from 'react'
import LottieView from 'lottie-react-native'

const FireCracker = () => {
  return (
    <LottieView
      source={require('../../assets/animations/fire-cracker.json')}
      autoPlay
      style={{ flex: 1, position: 'absolute', elevation: 5 }}
      loop={true}
    />
  )
}

export default FireCracker
