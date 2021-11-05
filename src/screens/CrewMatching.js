import { Button } from '@ant-design/react-native'
import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
} from 'react-native'
import ScreenName from '../components/ScreenName'
import { SERVER_URL } from '@env'
import Walking from '../animations/Walking'
import WaitingUserList from '../components/WaitingUserList'
import { useFocusEffect } from '@react-navigation/native'
import io from 'socket.io-client'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const socket = io.connect(SERVER_URL) //앱에 접속하자마자 소켓에 연결된다.

const CrewMatching = ({ route, navigation }) => {
  const userInfo = route.params
  const [waitingUsers, setWaitingUsers] = useState([userInfo])

  const _handleBack = useCallback(() => {
    //매칭 대기열 취소에 관한 로직
    console.log('매칭 대기열 취소')
    socket.emit('crewLeave', {
      ...userInfo,
      socketId: socket.id,
    })
    navigation.goBack()
    return true
  })

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', _handleBack)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', _handleBack)
    }, []),
  )

  useEffect(() => {
    console.log('use effect : ' + socket.id)

    //소켓관련 로직
    socket.emit('crewJoin', userInfo)
  }, [])

  return (
    <ScreenName name="워킹크루 매칭">
      {/* 워킹모드 페이지로 가기위한 임시버튼(추후 삭제)
      개발 중에는 아래 버튼 코드를 주석 해제하여 사용,
      실제 앱에서는 waiting queue의 user들이 모두 준비되면 워킹모드 자동 진입 */}
      {/* <View>
        <Button
          type="primary"
          style={{
            backgroundColor: '#4495D0',
            width: width * 0.4,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('WalkingMode')
          }}
        >
          워킹모드(임시)
        </Button>
      </View> */}
      <View style={styles.waitingContainer}>
        <WaitingUserList waitingUsers={waitingUsers} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Walking />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>크루원을 모집중입니다.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="primary"
          style={{
            backgroundColor: '#4495D0',
            width: width * 0.8,
            elevation: 5,
            marginBottom: 5,
          }}
          onPress={_handleBack}
        >
          취소
        </Button>
      </View>
    </ScreenName>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'BMHANNAAir_ttf',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  waitingContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 50,
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
