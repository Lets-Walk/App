import React from 'react'
import { View, Text } from 'react-native'
import ScreenName from '../components/ScreenName'

/*
    하단 네비게이션 바 아이콘, 색상 변경
    배경색 조정
    상단 페이지 제목 
    
*/

const Home = () => {
  return (
    <ScreenName name="홈">
      <Text>메인 내용</Text>
    </ScreenName>
  )
}

export default Home
