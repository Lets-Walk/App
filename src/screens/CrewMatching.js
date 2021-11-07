import { Button } from '@ant-design/react-native'
import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  Alert,
} from 'react-native'
import ScreenName from '../components/ScreenName'
import { SERVER_URL } from '@env'
import Walking from '../animations/Walking'
import WaitingUserList from '../components/WaitingUserList'
import { useFocusEffect } from '@react-navigation/native'
import io from 'socket.io-client'
import { LongPressGestureHandler } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const CrewMatching = ({ route, navigation }) => {
  const userInfo = route.params
  const [waitingUsers, setWaitingUsers] = useState([userInfo])
  const [status, setStatus] = useState('beforeMatching')
  const [crewId, setCrewId] = useState(null)
  const [socket, setSocket] = useState(null)

  const _handleBack = useCallback(() => {
    //매칭 대기열 취소에 관한 로직
    if (!crewId) {
      socket.emit('crewLeave', {
        ...userInfo,
        socketId: socket.id,
      })
      console.log('크루 매칭 대기열 취소')
    } else {
      socket.emit('battleLeave', {
        ...userInfo,
        crewId,
      })
      console.log('배틀 매칭 대기열 취소 crewId : ', crewId)
    }
    socket.disconnect()
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
    if (!socket) {
      setSocket(io.connect(SERVER_URL))
      return
    }
    //소켓관련 로직
    socket.emit('crewJoin', userInfo)

    socket.on('connect', () => console.log('socket 연결됨'))
    socket.on('battleLeave', () => {
      Alert.alert('배틀 매칭 실패', '크루원 중 한명이 나가서 매칭을 다시해야함')
      console.log('유저가 나가서 크루 매칭 다시 해야함')
      socket.disconnect()
      navigation.goBack()
    })

    socket.on('matching', (data) => {
      const { users } = data
      const userList = users.filter((user) => user.userId !== userInfo.id)
      setCrewId(data.roomId)
      setWaitingUsers([...waitingUsers, ...userList])
      Alert.alert('크루 매칭 성공', '크루매칭이 완료되었습니다.')
    })

    socket.on('battleMatching', (data) => {
      console.log(data)
    })
  }, [socket])

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
        <Text style={styles.text}>
          {crewId ? '상대 크루를 찾고 있습니다.' : '크루원을 모집 중 입니다.'}
        </Text>
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
