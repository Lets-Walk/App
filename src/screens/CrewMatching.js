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
import ShoesLoading from '../animations/ShoesLoading'
import ColorBackground from '../animations/ColorBackground'
import Checking from '../animations/Checking'
import CountDown from '../animations/CountDown'
import WaitingUserList from '../components/WaitingUserList'
import { useFocusEffect } from '@react-navigation/native'
import io from 'socket.io-client'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
import BasicButton from '../components/BasicButton'
import ConfirmModal from '../components/ConfirmModal'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const CrewMatching = ({ route, navigation }) => {
  const userInfo = route.params
  const [waitingUsers, setWaitingUsers] = useState([userInfo])
  const [status, setStatus] = useState('beforeMatching')
  const [crewId, setCrewId] = useState(null)
  const [socket, setSocket] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isMatching, setIsMatching] = useState(false)

  const _handleConfirm = useCallback(() => {
    navigation.goBack()
  }, [])

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
      setModalVisible(true)
      console.log('유저가 나가서 크루 매칭 다시 해야함')
      socket.disconnect()
    })

    socket.on('matching', (data) => {
      const { users } = data
      const userList = users.filter((user) => user.userId !== userInfo.id)
      setCrewId(data.roomId)
      setWaitingUsers([...waitingUsers, ...userList])
      //Alert.alert('크루 매칭 성공', '크루매칭이 완료되었습니다.')
    })

    //TODO : 배틀매칭 이벤트가 오면, 배틀정보에 대한 요소 출력 후 워킹모드로 넘어가야 한다.
    // ***** 상대 크루의 학교 정보 수신해서 정보 출력
    socket.on('battleMatching', (data) => {
      console.log('배틀 매칭 완료')
      console.log(data)
      setIsMatching(true)
      setTimeout(() => {
        navigation.navigate('WalkingMode', {
          socket: socket,
          battleRoomId: data.battleRoomId,
        })
      }, 4000)
    })
  }, [socket])

  if (crewId) {
    return (
      <View style={styles.container}>
        <ConfirmModal
          isVisible={modalVisible}
          setVisible={setModalVisible}
          texts={[
            '크루원이 크루를 나갔습니다.',
            '크루원 매칭을 다시 진행해주세요.',
          ]}
          onConfirm={_handleConfirm}
        />

        <View style={styles.waitingContainer}>
          <WaitingUserList waitingUsers={waitingUsers} />
          <Checking />
        </View>
        <View style={styles.animationContainer}>
          {isMatching ? <CountDown /> : <ShoesLoading />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {isMatching
              ? '매칭이 완료되었습니다.\n배틀을 시작합니다.'
              : '상대 크루를 찾고 있습니다.\n잠시만 기다려주세요.'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {isMatching ? null : (
            <BasicButton text="나가기" pressFunction={_handleBack} />
          )}
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.waitingContainer}>
          <WaitingUserList waitingUsers={waitingUsers} />
        </View>
        <View style={styles.animationContainer}>
          <Walking />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            크루원을 모집 중 입니다.{'\n'}4명이 입장하면 배틀매칭을 시작합니다.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <BasicButton text="나가기" pressFunction={_handleBack} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontFamily: 'Cafe24Shiningstar',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  waitingContainer: {
    position: 'absolute',
    top: height * 0.1,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
  animationContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
  },
})

export default CrewMatching
