import { Button } from '@ant-design/react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import ScreenName from '../components/ScreenName'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@env'
import Walking from '../animations/Walking'
import WaitingUserList from '../components/WaitingUserList'
import { ActivityIndicator } from '@ant-design/react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const NowMatching = ({ route, navigation }) => {
  const { id, nickname, profileUrl } = route.params
  const [ready, setReady] = useState(false)
  const [waitingUsers, setWaitingUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [readyDisabled, setReadyDisabled] = useState(false)
  const [cancelDisabled, setCancelDisabled] = useState(true)

  const me = {
    id: id,
    nickname: nickname + '(나)',
    profileUrl: profileUrl,
    isReady: false,
  }

  const _handleReady = useCallback(() => {
    me.isReady = true
    setWaitingUsers([me])
    setReadyDisabled(true)
    // 임시로 취소버튼을 disabled(3초 로딩 후 자동으로 워킹모드 진입)
    // 나중에는 setCancelDisabled(false)로 변경-waitingUsers가 모두 ready 상태일 때만 true
    setCancelDisabled(true)
    setLoading(true) // 3초간 loading 후 워킹모드로 넘어감
    setTimeout(() => {
      navigation.navigate('WalkingMode')
    }, 3000)
  }, [me])

  const _handleCancel = useCallback(() => {
    me.isReady = false
    setWaitingUsers([me])
    setReadyDisabled(false)
    setCancelDisabled(true)
  }, [me])

  useEffect(() => {
    setWaitingUsers([me])
  }, [])

  return (
    <ScreenName name="크루 매칭 중">
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
        <ActivityIndicator animating={loading} text="Loading..." size="large" />
        <Walking />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          매칭된 크루가 모두 준비 완료되면{'\n'}워킹모드가 시작됩니다. (2~4인)
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
          onPress={_handleReady}
          disabled={readyDisabled}
        >
          준비
        </Button>
        <Button
          type="default"
          style={{
            backgroundColor: '#f5f5f5',
            width: width * 0.8,
            elevation: 5,
          }}
          onPress={_handleCancel}
          disabled={cancelDisabled}
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

export default NowMatching
