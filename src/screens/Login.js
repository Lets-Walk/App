import React, { useState } from 'react'
import styled from 'styled-components/native'
import {
  Text,
  Pressable,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import AuthInput from '../components/AuthInput'
import { validateEmail, removeWhitespace } from '../utils/common'
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native'
import axios from 'axios'
import { SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '../utils/auth'
import { ActivityIndicator, Toast } from '@ant-design/react-native'
import ConfirmModal from '../components/ConfirmModal'

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #ffffff;
`

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 15px;
  margin-bottom: 0px;
  line-height: 15px;
  color: ${({ theme }) => theme.errorText};
  font-style: italic;
`

const Login = ({ navigation, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email)
    setEmail(changedEmail)
    if (validateEmail(changedEmail) && email !== '') {
      setErrorMessage('')
      setDisabled(false)
    } else {
      setErrorMessage('! 이메일 주소를 확인하세요.')
      setDisabled(true)
    }
  }
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password))
  }

  const login = async () => {
    setLoading(true)
    const userData = { email, password }
    try {
      const result = await axios.post(
        SERVER_URL + '/api/auth/login',
        userData,
        {
          timeout: 5000,
        },
      )
      const { token } = result.data
      await AsyncStorage.setItem('token', token)
      setLoading(false)
      setUser(await auth())
    } catch (err) {
      console.log(err)
      if (err.response) console.log(err.response.data)
      setPassword('')
      setLoading(false)
      setModalVisible(true)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior="height"
      keyboardVerticalOffset={10}
    >
      <Container>
        <ActivityIndicator
          animating={loading}
          toast
          text="Loading..."
          size="large"
        />
        <ConfirmModal
          isVisible={modalVisible}
          setVisible={setModalVisible}
          texts={[
            '로그인에 실패하였습니다',
            '이메일과 비밀번호를 확인해주세요.',
          ]}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            alignItems: 'center',
            height: '8%',
          }}
        >
          <Image
            source={require('../utils/auth_top.png')}
            style={{
              aspectRatio: 2846 / 759,
              flex: 1,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontFamily: 'ONEMobileBold',
            marginBottom: 5,
          }}
        >
          로그인
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#0806D9',
            fontFamily: 'ONEMobileRegular',
            marginBottom: 5,
          }}
        >
          {` 본 서비스는 대학교 공식 이메일 계정을 
        보유한 분들만 이용가능합니다. `}
        </Text>

        <AuthInput
          label="이메일"
          value={email}
          onChangeText={_handleEmailChange}
          placeholder="Email"
        />
        <ErrorText>{errorMessage}</ErrorText>
        <AuthInput
          label="비밀번호"
          value={password}
          onChangeText={_handlePasswordChange}
          placeholder="Password"
          isPassword
        />

        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type="primary"
            style={{
              paddingLeft: 100,
              paddingRight: 100,
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom: 5,
              borderRadius: 10,
              backgroundColor: '#67AFFF',
              elevation: 10,
              borderWidth: 0,
            }}
            onPress={login}
            disabled={disabled}
          >
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontFamily: 'BMHANNAAir_ttf',
              }}
            >
              LOGIN
            </Text>
          </Button>
          <WhiteSpace />
        </WingBlank>

        <Pressable onPress={() => navigation.navigate('회원가입')}>
          <Text
            style={{
              color: '#0806D9',
              fontSize: 16,
              fontFamily: 'ONEMobileRegular',
              textDecorationLine: 'underline',
            }}
          >
            계정이 없으신가요? 회원가입
          </Text>
        </Pressable>
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Login
