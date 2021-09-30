import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Pressable } from 'react-native'
import AuthInput from '../components/AuthInput'
import { validateEmail, removeWhitespace } from '../utils/common'
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 15px;
  margin-bottom: 10px;
  line-height: 15px;
  color: ${({ theme }) => theme.errorText};
  font-style: italic;
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email)
    setEmail(changedEmail)
    setErrorMessage(
      validateEmail(changedEmail) && email !== ''
        ? ''
        : '! 이메일 주소를 확인하세요.',
    )
  }
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password))
  }

  return (
    <Container>
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
          marginBottom: 20,
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
      {/* <Pressable
        style={{
          paddingLeft: 100,
          paddingRight: 100,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: 10,
          backgroundColor: '#121212',
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'BMHANNAAir_ttf',
          }}
        >
          로그인
        </Text>
      </Pressable> */}
      <WingBlank>
        <WhiteSpace />
        <Button
          type="primary"
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
            backgroundColor: '#121212',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              fontFamily: 'BMHANNAAir_ttf',
            }}
          >
            로그인
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
  )
}

export default Login
