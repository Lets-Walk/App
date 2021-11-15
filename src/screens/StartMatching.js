import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import ScreenName from '../components/ScreenName'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@env'
import ShapesBackground from '../animations/ShapesBackground'
import BasicButton from '../components/BasicButton'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const StartMatching = ({ navigation, user }) => {
  const campus = user.Campus
  const userId = user.id
  const nickname = user.nickname
  const [campusScore, setCampusScore] = useState('')
  const [campusRank, setCampusRank] = useState(1)
  const [profileUrl, setProfileUrl] = useState('https://ifh.cc/g/sSjFNC.png')

  const campusLogoUrl = SERVER_URL + '/static/logos/' + campus.image

  // 로그인 된 사용자의 학교명 load
  useEffect(async () => {
    try {
      const campusRes = await axios.get(
        SERVER_URL + '/api/campus?name=' + campus.name,
        { timeout: 3000 },
      )
      setCampusScore(campusRes.data.data.score)
    } catch (err) {
      console.log(err)
    }
    // setCampusRank(campusRes.data.data.rank) // api에 rank 추가 완료 후 주석 해제
  }, [campus])

  const _handleStartButton = useCallback(() => {
    navigation.navigate('CrewMatching', {
      id: userId,
      nickname: nickname,
      profileUrl: profileUrl,
      campus: campus,
    })
  }, [user])

  return (
    <ScreenName name="워킹크루 매칭">
      <ShapesBackground style={{ width: '100%' }} />
      <View style={styles.container}>
        <Text style={styles.campusNameText}>{campus.name}</Text>
        <Image source={{ uri: campusLogoUrl }} style={styles.logoContainer} />
        <View style={styles.campusRankContainer}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: 'Cafe24Shiningstar',
              marginBottom: 0,
            }}
          >
            현재 순위
          </Text>
          <Text style={{ fontSize: 30, fontFamily: 'Cafe24Shiningstar' }}>
            {campusRank}위 ({campusScore}점)
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <BasicButton text="START" pressFunction={_handleStartButton} />
        </View>
      </View>
    </ScreenName>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    marginTop: 30,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  campusNameText: {
    fontFamily: 'Cafe24Shiningstar',
    fontSize: 45,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
  },
  campusRankContainer: { alignItems: 'center', margin: 10 },
})

export default StartMatching
