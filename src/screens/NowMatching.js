import { Button } from '@ant-design/react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import ScreenName from '../components/ScreenName'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URL } from '@env'
import Walking from '../animations/Walking'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const NowMatching = ({ navigation }) => {
  const [ready, setReady] = useState(false)
  const [disabled, setDisabled] = useState(true)

  return (
    <ScreenName name="매칭 중">
      {/* 개발 중 워킹모드 페이지로 가기위한 임시버튼(추후 삭제)
      실제 앱에서는 waiting queue의 user들이 모두 준비되면 워킹모드 자동 진입 */}

      <View>
        <Button
          type="primary"
          style={{
            backgroundColor: '#4495D0',
            width: width * 0.4,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('워킹모드')
          }}
        >
          워킹모드(임시)
        </Button>
      </View>
      <View>
        <Text>Waiting Queue Container</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Walking />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          매칭된 크루가 모두 준비 완료되면{'\n'}워킹모드가 시작됩니다.
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
          onPress={() => {
            setReady(true)
            setDisabled(false)
            console.log('Ready to walking')
          }}
          disabled={!disabled}
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
          onPress={() => {
            setReady(false)
            setDisabled(true)
            console.log('Cancel to Ready')
          }}
          disabled={disabled}
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
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 30,
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
