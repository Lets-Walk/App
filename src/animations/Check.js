import React from 'react'
import LottieView from 'lottie-react-native'

const Checking = () => {
  return (
    <LottieView
      source={require('../../assets/animations/check.json')}
      style={{ width: 130, height: 130, top: -30 }}
      autoPlay
      loop={false}
    />
  )
}

export default Checking
