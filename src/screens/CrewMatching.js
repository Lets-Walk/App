import { Button } from '@ant-design/react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import ScreenName from '../components/ScreenName'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@env'

const CrewMatching = ({ navigation }) => {
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height

  const [campus, setCampus] = useState('')

  // 로그인 된 사용자의 학교명 load
  useEffect(async () => {
    let result = null
    try {
      const token = await AsyncStorage.getItem('token')
      const result = await axios.get(SERVER_URL + '/api/auth/me', {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 3000,
      })
      setCampus(result.data.user.Campus.name)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <ScreenName name="워킹크루">
      <Text>{campus}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.1 + 50,
          left: (width - width * 0.8) / 2,
          alignItems: 'center',
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: '#4495D0',
            width: useWindowDimensions().width * 0.8,
          }}
          onPress={() => {
            navigation.navigate('매칭중')
          }}
        >
          매칭시작
        </Button>

        {/* 임시버튼-> 추후 삭제(워킹모드 진입은 '매칭시작'을 통해서 진행*/}
        {/* <Button
          type="primary"
          style={{
            backgroundColor: 'black',
            width: useWindowDimensions().width * 0.5,
          }}
          onPress={() => {
            navigation.navigate('워킹모드')
          }}
        >
          워킹모드
        </Button> */}
      </View>
    </ScreenName>
  )
}

export default CrewMatching
