import React from 'react'
import LottieView from 'lottie-react-native'

const CountDown = () => {
  return (
    <LottieView
      source={require('../../assets/animations/countdown.json')}
      autoPlay
      style={{ flex: 1, marginBottom: 10, marginTop: 30 }}
      loop={false}
    />
  )
}

export default CountDown
