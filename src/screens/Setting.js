import React from 'react'
import { View, Text } from 'react-native'
import ScreenName from '../components/ScreenName'

const Setting = () => {
  return (
    <ScreenName name="설정">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting!</Text>
      </View>
    </ScreenName>
  )
}

export default Setting
