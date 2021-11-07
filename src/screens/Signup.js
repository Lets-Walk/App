import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import {
  Text,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native'
import AuthInput from '../components/AuthInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  WhiteSpace,
  WingBlank,
  ActivityIndicator,
} from '@ant-design/react-native'
import SelectDropDown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { SERVER_URL } from '@env'
import ConfirmModal from '../components/ConfirmModal'
import LinearGradient from 'react-native-linear-gradient'
import GradientColor from '../components/styles/GradientColor'

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 15px;
  margin-bottom: -5px;
  margin-top: -5px;
  line-height: 15px;
  color: ${({ theme }) => theme.errorText};
  font-style: italic;
`

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`

const Signup = ({ navigation }) => {
  //유저 정보
  const [user, setUser] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  })

  //유저 eamil input
  const [emailId, setEmailId] = useState('')
  //유저가 입력한 인증코드
  const [verificationCode, setVerificationCode] = useState('')
  //서버로 부터 받은 인증코드
  const [authCode, setAuthcode] = useState('')
  //인증코드 유효성
  const [isVerify, setVerify] = useState(false)
  //패스워드 확인 input
  const [passwordConfirm, setPasswordConfirm] = useState('')
  //패스워드 확인 에러 메세지
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  //패스워드 길이 에러 메세지
  const [passwordLengthError, setPasswordLengthError] = useState('')

  //전체 대학 정보
  const [college, setCollege] = useState([])
  //유저가 선택한 대학정보
  const [campus, setCampus] = useState({})
  //회원가입 버튼 disable
  const [disabled, setDisabled] = useState(true)
  //모달 view 여부
  const [modalVisible, setModalVisible] = useState(false)
  //모달 메세지
  const [modalMessages, setModalMessages] = useState([])
  //로딩
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    //campus data fetch
    console.log('campus fetch')
    try {
      const result = await axios.get(SERVER_URL + '/api/campus', {
        timeout: 5000,
      })
      setCollege(result.data.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    setPasswordLengthError('')
    setPasswordConfirmError('')
    if (user.password.length > 0 && user.password.length < 6) {
      setPasswordLengthError('! 6자리 이상 입력하세요.')
    } else if (
      passwordConfirm.length != 0 &&
      user.password != passwordConfirm
    ) {
      setPasswordConfirmError(
        user.password == passwordConfirm ? '' : '! 다시 입력하세요.',
      )
    }
  }, [user.password, passwordConfirm])

  useEffect(() => {
    // 인증코드 일치 여부 확인하여 verification code 자리에 수정 필요
    setDisabled(
      !(
        user.name &&
        user.nickname &&
        user.email &&
        user.password &&
        campus &&
        college &&
        verificationCode &&
        isVerify &&
        passwordConfirm &&
        !passwordConfirmError &&
        !passwordLengthError
      ),
    )
  })

  const _handleSignupButtonPress = async () => {
    //sign-up logic
    setLoading(true)
    try {
      const result = await axios.post(
        SERVER_URL + '/api/auth/sign-up',
        {
          ...user,
          campusId: campus.id,
        },
        {
          timeout: 5000,
        },
      )
      console.log(result.data.data)
      setLoading(false)
      setModalMessages(['회원가입이 완료되었습니다.'])
      setModalVisible(true)
    } catch (err) {
      console.log(err)
      if (err.response) console.log(err.response)
      setLoading(false)
      setModalMessages(['회원가입에 실패했습니다..'])
      setModalVisible(true)
    }
  }

  const _handleVerificationReqButtonPress = async () => {
    if (!emailId || !campus) return
    // email verifiaction request logic
    setUser({ ...user, email: emailId + campus.domain })

    try {
      const result = await axios.post(
        SERVER_URL + '/api/auth/email',
        {
          email: emailId + campus.domain,
        },
        {
          timeout: 5000,
        },
      )
      setAuthcode(result.data.data)
      setModalMessages(['인증번호를 전송했습니다.', '이메일을 확인해주세요.'])
      setModalVisible(true)
    } catch (err) {
      console.log(err)
      setModalMessages(['이미 존재하는 이메일 입니다.'])
      setModalVisible(true)
      if (err.response) console.log(err.response.data)
    }
  }

  const _handleVerificationButtonPress = () => {
    // email verification by sending verification code
    if (
      verificationCode !== '' &&
      authCode !== '' &&
      verificationCode === authCode
    )
      setVerify(true)
    else {
      setModalMessages(['인증번호가 일치하지 않습니다.'])
      setModalVisible(true)
    }
    console.log('verification')
  }

  return (
    <LinearGradient colors={GradientColor} style={{ flex: 1 }}>
      <KeyboardAwareScrollView extraScrollHeight={40}>
        <ConfirmModal
          isVisible={modalVisible}
          setVisible={setModalVisible}
          texts={modalMessages}
          onConfirm={
            disabled
              ? null
              : () => {
                  navigation.goBack()
                }
          }
        />
        <ActivityIndicator
          animating={loading}
          toast
          text="Loading..."
          size="large"
        />
        <Container
          style={{
            height: useWindowDimensions().height - 60,
            width: useWindowDimensions().width,
          }}
        >
          <AuthInput
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text.trim() })}
            placeholder="이름"
          />
          <AuthInput
            value={user.nickname}
            onChangeText={(text) => setUser({ ...user, nickname: text.trim() })}
            placeholder="닉네임"
          />

          <SelectDropDown
            data={college}
            onSelect={(selectedItem, index) => {
              setCampus(selectedItem)
            }}
            defaultButtonText={'---------- 학교명을 선택하세요 ----------'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item, index) => {
              return item.name
            }}
            renderDropdownIcon={() => {
              return <Icon name="down" />
            }}
            buttonStyle={styles.dropdownButtonStyle}
            buttonTextStyle={styles.dropdownButtonTextStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTextStyle}
          />

          <ButtonContainer>
            <View style={styles.row}>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputEmailId}
                  onChangeText={(text) => setEmailId(text.trim())}
                  placeholder="학교 이메일"
                  fontSize={15}
                  value={emailId}
                />
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputDomain}
                  editable={false}
                  placeholder={campus.domain}
                  placeholderTextColor={'#000000'}
                  fontSize={15}
                />
              </View>
            </View>

            <Button
              type="primary"
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 10,
                backgroundColor: 'powderblue',
                borderWidth: 0,
                marginLeft: 2,
              }}
              onPress={_handleVerificationReqButtonPress} // here
            >
              <Text
                style={{
                  fontSize: 16,
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
              onChangeText={(text) => setVerificationCode(text.trim())}
              placeholder="인증번호"
            />
            <Button
              type="primary"
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 10,
                backgroundColor: 'powderblue',
                borderWidth: 0,
                marginLeft: 2,
              }}
              onPress={_handleVerificationButtonPress} // here
              disabled={isVerify}
            >
              {isVerify ? (
                <Icon name="check" color="green" size={30} />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'BMHANNAAir_ttf',
                  }}
                >
                  인증
                </Text>
              )}
            </Button>
          </ButtonContainer>

          <AuthInput
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text.trim() })}
            placeholder="비밀번호(6자리 이상)"
            isPassword
          />
          <ErrorText>{passwordLengthError}</ErrorText>
          <AuthInput
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(text.trim())}
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
                backgroundColor: '#00b9a8',
              }}
              onPress={_handleSignupButtonPress} // here
              disabled={disabled}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  fontFamily: 'BMHANNAAir_ttf',
                }}
              >
                회원가입
              </Text>
            </Button>
            <WhiteSpace />
          </WingBlank>
        </Container>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#d4edfd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 5,
    marginBottom: 5,
  },
  dropdownButtonTextStyle: { color: '#444', textAlign: 'left' },
  dropdownDropdownStyle: { backgroundColor: '#d4edfd' },
  dropdownRowStyle: {
    backgroundColor: '#d4edfd',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTextStyle: { color: '#444', textAlign: 'left' },
  row: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  inputWrap: {
    flex: 1,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inputEmailId: {
    fontSize: 20,
    marginBottom: -12,
    marginRight: 5,
    backgroundColor: '#d4edfd',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputDomain: {
    fontSize: 20,
    marginBottom: -12,

    backgroundColor: '#d4edfd',
    borderRadius: 8,
  },
})

export default Signup
