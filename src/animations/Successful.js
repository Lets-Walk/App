import React from 'react'
import LottieView from 'lottie-react-native'

const Successful = () => {
  return (
    <LottieView
      source={require('../../assets/animations/successful.json')}
      autoPlay
      loop
    />
  )
}

export default Successful
