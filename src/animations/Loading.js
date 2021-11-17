import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <LottieView
      source={require('../../assets/animations/loading.json')}
      autoPlay
      style={{ flex: 1 }}
      loop={true}
    />
  )
}

export default Loading
