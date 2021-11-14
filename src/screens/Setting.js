import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ScreenName from '../components/ScreenName'
import SettingsButton from '../components/SettingsButton'

const Setting = () => {
  const height = Dimensions.get('window').height
  return (
    <ScreenName name="설정">
      <View
        style={{
          justifyContent: 'space-around',
          marginTop: 30,
          alignItems: 'center',
          height: height * 0.7,
        }}
      >
        <SettingsButton text="앱 소개" />
        <SettingsButton text="버전정보" />
        <SettingsButton text="이용약관" />
        <SettingsButton text="자주 묻는 질문(FAQ)" />
        <SettingsButton text="로그아웃" />
        <SettingsButton text="회원탈퇴" />
      </View>
    </ScreenName>
  )
}
const styles = StyleSheet.create({
  listName: {
    fontSize: 20,
    fontFamily: 'ONEMobileRegular',
    color: '#00248B',
  },
})

export default Setting
