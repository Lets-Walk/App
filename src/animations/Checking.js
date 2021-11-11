import React from 'react'
import LottieView from 'lottie-react-native'

const Checking = () => {
  return (
    <LottieView
      source={require('../../assets/animations/checking.json')}
      autoPlay
      loop={false}
    />
  )
}

export default Checking
