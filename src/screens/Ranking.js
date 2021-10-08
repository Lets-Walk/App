import React from 'react'
import { View, Text } from 'react-native'
import ScreenName from '../components/ScreenName'

const Ranking = () => {
  return (
    <ScreenName name="대학랭킹">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ranking!</Text>
      </View>
    </ScreenName>
  )
}

export default Ranking
