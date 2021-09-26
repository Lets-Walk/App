import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Pressable } from 'react-native'
import AuthInput from '../components/AuthInput'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <AuthInput
        label="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        isPassword
      />
      <Pressable
        style={{
          paddingLeft: 100,
          paddingRight: 100,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: 10,
          backgroundColor: '#121212',
          marginBottom: 20,
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
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')}>
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
