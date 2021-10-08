import { Button } from '@ant-design/react-native'
import React from 'react'
import { View, Text } from 'react-native'
import ScreenName from '../components/ScreenName'

const CrewMatching = ({ navigation }) => {
  return (
    <ScreenName name="워킹크루">
      <View>
        <Text>CrewMatching!</Text>
        <Button
          onPress={() => {
            navigation.navigate('워킹모드')
          }}
        >
          매칭시작
        </Button>
      </View>
    </ScreenName>
  )
}

export default CrewMatching
