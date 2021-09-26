import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Pressable } from 'react-native'
import AuthInput from '../components/AuthInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`

const Signup = () => {
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [university, setUniversity] = useState('')
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Text
          style={{
            fontSize: 40,
            color: '#ffffff',
            fontFamily: 'BMHANNAAir_ttf',
            marginBottom: 5,
          }}
        >
          회원가입
        </Text>
        <AuthInput
          label="이름"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />
        <AuthInput
          label="닉네임"
          value={nickName}
          onChangeText={(text) => setNickName(text)}
          placeholder="Nickname"
        />
        <AuthInput
          label="학교명"
          value={university}
          onChangeText={(text) => setUniversity(text)}
          placeholder="University Name"
        />
        <AuthInput
          label="학교 이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <AuthInput
          label="인증번호"
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          placeholder="Verification code"
        />
        <AuthInput
          label="비밀번호"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          isPassword
        />
        <AuthInput
          label="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          placeholder="Password Confirm"
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
            회원가입
          </Text>
        </Pressable>
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default Signup
