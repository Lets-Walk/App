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
  List,
  Picker,
  PickerView,
  Provider,
} from '@ant-design/react-native'
import SelectDropDown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/AntDesign'

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 25px;
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
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`

const Signup = () => {
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [colleges, setColleges] = useState([])
  const [domains, setDomains] = useState('')

  useEffect(() => {
    //sample data
    setColleges([
      {
        title: '고려대학교',
        domains: '@korea.ac.kr',
      },
      {
        title: '서울대학교',
        domains: '@snu.ac.kr',
      },
      {
        title: '숭실대학교',
        domains: '@ssu.ac.kr',
      },
      {
        title: '연세대학교',
        domains: '@yonsei.ac.kr',
      },
      {
        title: '중앙대학교',
        domains: '@cau.ac.kr',
      },
      {
        title: '한양대학교',
        domains: '@hanyang.ac.kr',
      },
    ])
  }, [])

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

        <SelectDropDown
          data={colleges}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            // domainRef.current.reset
            // setDomains('')
            setDomains(selectedItem.domains)
          }}
          defaultButtonText={'---------- 학교명을 선택하세요 ----------'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.title
          }}
          rowTextForSelection={(item, index) => {
            return item.title
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
                onChangeText={(text) => setEmailId(text)}
                placeholder="학교 이메일"
                fontSize={15}
                value={emailId}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputDomain}
                editable={false}
                placeholder={domains}
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
            }}
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
            onChangeText={(text) => setVerificationCode(text)}
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
            }}
          >
            <Text
              style={{
                fontSize: 18,
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
              회원가입
            </Text>
          </Button>
          <WhiteSpace />
        </WingBlank>
      </Container>
    </KeyboardAwareScrollView>
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
