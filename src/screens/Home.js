import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ScreenName from '../components/ScreenName'

/*
    하단 네비게이션 바 아이콘, 색상 변경
    배경색 조정
    상단 페이지 제목 
    
*/

const Home = ({ user }) => {
  const name = user.name
  const campus = user.Campus.name // 소속 대학명
  const stepCount = user.Walk.stepcount // 걸음수
  const wmCount = user.Walk.wmcount // 워킹모드 참여 횟수
  const userEmail = user.email // 사용자 이메일
  const nickname = user.nickname // 사용자 닉네임
  const profileMessage = user.profilemessage // 사용자 프로필 메세지

  return (
    <ScreenName name="홈">
      <Text
        style={{
          fontSize: 23,
          marginLeft: 20,
          marginTop: 20,
          fontFamily: 'ONEMobileBold',
        }}
      >
        {name}님, 안녕하세요!
      </Text>
      <View style={styles.Container}>
        <View style={styles.UserInfoContainer}>
          <Text style={styles.UserInfoText}>{nickname}</Text>
          <Text>{userEmail}</Text>
        </View>
        <View>
          <Text>{stepCount}</Text>
        </View>
        <Text>{campus}</Text>
      </View>
    </ScreenName>
  )
}

const styles = StyleSheet.create({
  Container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  UserInfoContainer: {
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    height: 120,
    width: Dimensions.get('window').width - 40,
    height: 120,
    borderRadius: 10,
  },
  UserInfoText: {
    fontSize: 20,
    fontFamily: 'ONEMobileRegular',
  },
})

export default Home
