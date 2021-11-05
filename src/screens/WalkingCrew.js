import { Button } from '@ant-design/react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import ScreenName from '../components/ScreenName'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@env'
import ShapesBackground from '../animations/ShapesBackground'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const CrewMatching = ({ navigation, user }) => {
  console.log(user)
  const campus = user.Campus
  const userId = user.id
  const nickname = user.nickname
  const [logoURL, setLogoURL] = useState('')
  const [campusScore, setCampusScore] = useState('')
  const [campusRank, setCampusRank] = useState(1)
  const [profileUrl, setProfileUrl] = useState('https://ifh.cc/g/sSjFNC.png')

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

  return (
    <ScreenName name="워킹크루 매칭">
      <ShapesBackground />
      <View style={styles.container}>
        <Text style={styles.campusNameText}>{campus.name}</Text>

        <Image
          source={{ uri: 'https://ifh.cc/g/oSrubm.png' }} // sample url
          style={styles.logoContainer}
        />
        {/* server에 학교별 logo 저장 완료 후, 나중에 위 Image tag는 삭제 후 아래 Image tag로 대체 */}
        {/* <Image source={{uri: logoURL}} style={styles.logoContainer} /> */}
      </View>

      <View style={styles.campusRankContainer}>
        <Text
          style={{
            fontSize: 23,
            fontFamily: 'BMHANNAAir_ttf',
            marginBottom: 5,
          }}
        >
          현재 순위
        </Text>
        <Text style={{ fontSize: 20, fontFamily: 'BMHANNAAir_ttf' }}>
          {campusRank}위 ({campusScore}점)
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="primary"
          style={{
            backgroundColor: '#4495D0',
            width: width * 0.8,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('CrewMatching', {
              id: userId,
              nickname: nickname,
              profileUrl: profileUrl,
            })
          }}
        >
          매칭시작
        </Button>
      </View>
    </ScreenName>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.1 + 50,
    left: (width - width * 0.8) / 2,
    alignItems: 'center',
  },
  container: { alignItems: 'center', marginTop: height * 0.2 },
  campusNameText: {
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 35,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  campusRankContainer: { alignItems: 'center', margin: 20 },
})

export default CrewMatching
