import React from 'react'
import LottieView from 'lottie-react-native'

const ShoesLoading = () => {
  return (
    <LottieView
      source={require('../../assets/animations/shoesLoading.json')}
      autoPlay
      loop
    />
  )
}

export default ShoesLoading
