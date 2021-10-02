import React, { useState } from 'react'
import styled from 'styled-components/native'
import {
  Text,
  Pressable,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native'
import AuthInput from '../components/AuthInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  WhiteSpace,
  WingBlank,
  List,
  Picker,
  PickerView,
  Provider,
} from '@ant-design/react-native'

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
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

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 30px 30px;
`

const Signup = () => {
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [university, setUniversity] = useState('')
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')

  const _handlePasswordConfirmChange = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm)
    setPasswordConfirmError(
      password == passwordConfirm ? '' : '! 다시 입력하세요.',
    )
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={40}>
      <Container
        style={{
          height: useWindowDimensions().height - 60,
          width: useWindowDimensions().width,
        }}
      >
        <AuthInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="이름"
        />
        <AuthInput
          value={nickName}
          onChangeText={(text) => setNickName(text)}
          placeholder="닉네임"
        />
        <AuthInput
          value={university}
          onChangeText={(text) => setUniversity(text)}
          placeholder="학교명"
        />
        <ButtonContainer>
          <AuthInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="학교 이메일"
          />

          <Button
            type="primary"
            style={{
              paddingLeft: 13,
              paddingRight: 13,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
              marginLeft: 5,
              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'BMHANNAAir_ttf',
              }}
            >
              인증{'\n'}요청
            </Text>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <AuthInput
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            placeholder="인증번호"
          />

          <Button
            type="primary"
            style={{
              paddingLeft: 13,
              paddingRight: 13,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              marginLeft: 5,
              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'BMHANNAAir_ttf',
              }}
            >
              인증
            </Text>
          </Button>
        </ButtonContainer>

        <AuthInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="비밀번호"
          isPassword
        />
        <AuthInput
          value={passwordConfirm}
          onChangeText={(text) => _handlePasswordConfirmChange(text)}
          placeholder="비밀번호 확인"
          isPassword
        />
        <ErrorText>{passwordConfirmError}</ErrorText>
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
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default Signup
