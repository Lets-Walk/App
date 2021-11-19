import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = (props) => {
  return (
    <LottieView
      {...props}
      source={require('../../assets/animations/loading.json')}
      autoPlay
      loop={true}
    />
  )
}

export default Loading
