import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Fragments,
  Image,
  ScrollView,
} from 'react-native'
import ScreenName from '../components/ScreenName'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { List } from '@ant-design/react-native'
/*
    하단 네비게이션 바 아이콘, 색상 변경
    배경색 조정
    상단 페이지 제목 
    
*/

const Home = ({ user }) => {
  const name = user.name // 사용자 이름
  const campus = user.Campus.name // 소속 대학명
  const [stepCount, setStepCount] = useState(1512) // 걸음수 mockup data(user.Walk.stepcount)
  const userEmail = user.email // 사용자 이메일
  const nickname = user.nickname // 사용자 닉네임
  const profileMessage = user.profilemessage // 사용자 프로필 메세지
  const [winNum, setWinNum] = useState(5) // mockup data (user.win)
  const [loseNum, setLoseNum] = useState(2) // mockup data (user.lose)
  const winningRate = parseFloat((winNum / (winNum + loseNum)) * 100).toFixed(2) // 승률
  const [profileUrl, setProfileUrl] = useState('https://ifh.cc/g/sSjFNC.png') // 프로필 사진 url (user.profileUrl)
  const campusImageUrl = 'https://ifh.cc/g/oSrubm.png' // 학교 logo url (user.Campus.image)
  const [results, setResults] = useState([
    { date: '21.12.26', startTime: '10:23', endTime: '10:55' },
    { date: '21.12.28', startTime: '09:11', endTime: '09:42' },
    { date: '21.12.28', startTime: '14:48', endTime: '15:01' },
    { date: '21.12.29', startTime: '11:11', endTime: '11:35' },
    { date: '21.12.30', startTime: '17:55', endTime: '18:05' },
  ]) // mockup data

  let key = 1

  return (
    <ScreenName name="홈">
      <Text
        style={{
          fontSize: 23,
          marginLeft: 22,
          marginTop: 20,
          fontFamily: 'ONEMobileBold',
        }}
      >
        {name}님, 안녕하세요!
      </Text>
      <View style={styles.Container}>
        <View
          style={[
            styles.UserInfoContainer,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: profileUrl }}
              style={styles.ProfileContainer}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContnet: 'space-between',
                marginLeft: 10,
              }}
            >
              <Text style={styles.UserInfoText}>{nickname}</Text>
              <Text
                style={[
                  styles.UserInfoText,
                  { fontSize: 15, marginTop: 3, fontStyle: 'italic' },
                ]}
              >
                {userEmail}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginRight: 20,
            }}
          >
            <Image
              source={{ uri: campusImageUrl }}
              style={styles.ProfileContainer}
            />
            <Text
              style={[styles.UserInfoText, { fontSize: 12, paddingTop: 5 }]}
            >
              {campus}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ backgroundColor: '#e6f4f1' }, styles.CountContainer]}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesomeIcon name="shoe-prints" color="#001d40" size={15} />
              <Text style={[styles.BasicText, { fontFamily: 'ONEMobileBold' }]}>
                {'\t'}나의 걸음 수{'\n'}
              </Text>
            </View>
            <Text style={[styles.BasicText, { flexDirection: 'column' }]}>
              {stepCount} 걸음
            </Text>
          </View>

          <View style={[{ backgroundColor: '#fcfcd4' }, styles.CountContainer]}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesomeIcon name="crown" color="#001d40" size={15} />
              <Text style={[styles.BasicText, { fontFamily: 'ONEMobileBold' }]}>
                {'\t'}나의 전적
              </Text>
            </View>
            <Text
              style={[styles.BasicText, { paddingTop: 5, paddingBottom: 3 }]}
            >
              {winNum}승 {loseNum}패
            </Text>
            <Text style={[styles.BasicText, { fontSize: 15 }]}>
              (승률: {winningRate}%)
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.BasicText,
            { marginLeft: 22, marginTop: 30, fontFamily: 'ONEMobileRegular' },
          ]}
        >
          지난 배틀 결과
        </Text>
        <View style={styles.ResultContainer}>
          <ScrollView>
            <List>
              {results.map((result) => (
                <List.Item key={key++}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 5,
                    }}
                  >
                    <Text style={[styles.BasicText, { fontSize: 15 }]}>
                      {result.date} ({result.startTime} ~ {result.endTime})
                    </Text>
                    <FontAwesomeIcon name="search" color="#001d40" size={15} />
                  </View>
                </List.Item>
              ))}
            </List>
          </ScrollView>
        </View>
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
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    height: 120,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  UserInfoText: {
    fontSize: 20,
    fontFamily: 'ONEMobileRegular',
  },
  CountContainer: {
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    height: 120,
    width: (Dimensions.get('window').width - 40) / 2 - 10,
    height: 120,
    borderRadius: 10,
  },
  BasicText: {
    fontFamily: 'ONEMobileRegular',
    paddingBottom: 0,
    fontSize: 18,
  },
  ProfileContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  ResultContainer: {
    marginTop: 8,
    marginLeft: 20,
    backgroundColor: '#F4F4F4',
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    height: 200,
  },
})

export default Home
