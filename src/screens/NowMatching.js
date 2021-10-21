import React from 'react'
import { View, Text } from 'react-native'
import ScreenName from '../components/ScreenName'
import { Button } from '@ant-design/react-native'

const NowMatching = ({ navigation }) => {
  return (
    <ScreenName name="매칭 중">
      <Text>매칭 중 UI</Text>
      {/* 임시버튼-> 추후 삭제(워킹모드 진입은 대기열의 user들이 모두 준비가 완료되면 자동 진입)*/}
      <Button
        type="primary"
        style={{
          backgroundColor: 'black',
          width: 200,
        }}
        onPress={() => {
          navigation.navigate('워킹모드')
        }}
      >
        워킹모드
      </Button>
    </ScreenName>
  )
}

export default NowMatching
