import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Pressable } from 'react-native'
import AuthInput from '../components/AuthInput'
import { validateEmail, removeWhitespace } from '../utils/common'
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native'
import axios from 'axios'
import { SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '../utils/auth'
import { ActivityIndicator, Toast } from '@ant-design/react-native'
import ConfirmModal from '../components/ConfirmModal'
import LinearGradient from 'react-native-linear-gradient'
import GradientColor from '../components/styles/GradientColor'

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
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
      await auth(setUser)
    } catch (err) {
      console.log(err)
      if (err.response) console.log(err.response.data)
      setPassword('')
      setLoading(false)
      setModalVisible(true)
    }
  }

  return (
    <>
      <LinearGradient colors={GradientColor} style={{ flex: 1 }}>
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
          <Text
            style={{
              fontSize: 40,
              color: '#ffffff',
              fontFamily: 'BMHANNAAir_ttf',
              marginBottom: 5,
            }}
          >
            로그인
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#ffff00',
              fontFamily: 'BMHANNAAir_ttf',
              marginBottom: 10,
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
                backgroundColor: '#008cad',
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
                color: 'yellow',
                fontSize: 18,
                fontFamily: 'BMHANNAAir_ttf',
                textDecorationLine: 'underline',
              }}
            >
              계정이 없으신가요? 회원가입
            </Text>
          </Pressable>
        </Container>
      </LinearGradient>
    </>
  )
}

export default Login
