import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native'
import styled from 'styled-components'
import ScreenName from '../components/ScreenName'
import SettingsButton from '../components/SettingsButton'
import Modal from 'react-native-modal'
import SettingsModal from '../components/SettingsModal'
import ConfirmModal from '../components/ConfirmModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Setting = ({ navigation }) => {
  const height = Dimensions.get('window').height
  const [isIntroVisible, setIsIntroVisible] = useState(false) // 앱 소개
  const [versionVisible, setVersionVisible] = useState(false) // 버전정보
  const [termsVisible, setTermsVisible] = useState(false) // 이용약관
  const [FaqVisible, setFaqVisible] = useState(false) // FAQ
  const [CsVisible, setCsVisible] = useState(false) // FAQ

  const Container = styled.View`
    width: 90%;
    height: 20%;
    background-color: #ffffff;
    border-radius: 15px;
    justify-content: center;
  `

  const CenterView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `

  const [LogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false)

  const _handleIntro = useCallback(() => {
    navigation.navigate('OnBoarding')
  })

  const _handleVersion = useCallback(() => {
    setVersionVisible(true)
  })

  const _handleTerms = useCallback(() => {
    setTermsVisible(true)
  })

  const _handleFaq = useCallback(() => {
    setFaqVisible(true)
  })

  const _handleCs = useCallback(() => {
    setCsVisible(true)
  })

  const _handleLogout = useCallback(() => {
    setLogoutConfirmModalVisible(true)
  })

  const _handleLogoutOK = () => {
    // Logout logic
    AsyncStorage.setItem('token', '')
    BackHandler.exitApp()
    return
  }

  const textArr = ['안녕하세요', '반갑습니다']

  return (
    <ScreenName name="설정">
      <SettingsModal
        modalTitle="버전정보"
        modalText={['ver 1.0.0']}
        isVisible={versionVisible}
        width="80%"
        height="30%"
        onConfirm={useCallback(() => {
          setVersionVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="이용약관"
        modalText={['이용약관 내용']}
        isVisible={termsVisible}
        width="100%"
        height="100%"
        onConfirm={useCallback(() => {
          setTermsVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="자주 묻는 질문(FAQ)"
        modalText={[
          'Q1. 학교 이메일이 없으면 이용이 불가능한가요?',
          '',
          'A1. 네. 워크투게더는 대학생분들의 걷기 운동을 촉진하기 위하여 제공되는 서비스이므로 대학 이메일 계정이 없으신 분들은 이용이 불가능한 점 양해부탁드립니다.',
          '',
          '',
          'Q2. 무료로 이용이 가능한가요?',
          '',
          'A2. 네. 워크투게더는 전면 무료 서비스로 제공되고 있습니다. 단, 모바일 데이터 사용 시 통신사 이용요금이 부과될 수 있는 점 주의 바랍니다.',
          '',
          '',
          'Q3. 앱 관련하여 문의사항이 있습니다.',
          '',
          'A3. 고객센터 이메일(walktogether.cs@gmail.com)로 연락바랍니다.',
        ]}
        isVisible={FaqVisible}
        width="100%"
        height="70%"
        onConfirm={useCallback(() => {
          setFaqVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="고객센터"
        modalText={[
          '문의사항은 아래 메일로 연락주세요.',
          '(walktogether.cs@gmail.com)',
        ]}
        isVisible={CsVisible}
        width="80%"
        height="30%"
        onConfirm={useCallback(() => {
          setCsVisible(false)
        })}
      />

      <Modal
        isVisible={LogoutConfirmModalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        backdropOpacity={0.5}
        backdropTransitionInTiming={600}
        deviceHeight={useWindowDimensions().height * 1.5}
      >
        <CenterView>
          <Container>
            <View
              style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}
            >
              <Text style={styles.text}>로그아웃 하시겠습니까?</Text>
            </View>

            <View
              style={[
                styles.button,
                { flexDirection: 'row', justifyContent: 'space-around' },
              ]}
            >
              <TouchableOpacity onPress={_handleLogoutOK}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#4495D0',
                    fontFamily: 'BMHANNAAir_ttf',
                  }}
                >
                  예
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLogoutConfirmModalVisible(false)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: '#4495D0',
                    fontFamily: 'BMHANNAAir_ttf',
                  }}
                >
                  아니요
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </CenterView>
      </Modal>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 60,
        }}
      >
        <SettingsButton text="워크투게더 소개" pressFunction={_handleIntro} />
        <SettingsButton text="버전정보" pressFunction={_handleVersion} />
        <SettingsButton text="이용약관" pressFunction={_handleTerms} />
        <SettingsButton text="자주 묻는 질문(FAQ)" pressFunction={_handleFaq} />
        <SettingsButton text="고객센터" pressFunction={_handleCs} />
        <SettingsButton text="로그아웃" pressFunction={_handleLogout} />
        <SettingsButton text="회원탈퇴" />
      </View>
    </ScreenName>
  )
}
const styles = StyleSheet.create({
  listName: {
    fontSize: 20,
    fontFamily: 'ONEMobileRegular',
    color: '#00248B',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'ONEMobileBold',
  },
  text: {
    fontSize: 20,
    fontFamily: 'ONEMobileLight',
  },
  button: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default Setting
