import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import styled from 'styled-components'
import ScreenName from '../components/ScreenName'
import SettingsButton from '../components/SettingsButton'
import Modal from 'react-native-modal'
import SettingsModal from '../components/SettingsModal'
import ConfirmModal from '../components/ConfirmModal'

const Setting = () => {
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
    setIsIntroVisible(true)
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
  }

  return (
    <ScreenName name="설정">
      <SettingsModal
        modalTitle="워크투게더 소개"
        modalText="앱 소개 내용 작성..."
        isVisible={isIntroVisible}
        width="100%"
        height="100%"
        onConfirm={useCallback(() => {
          setIsIntroVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="버전정보"
        modalText="ver. 1.0.0"
        isVisible={versionVisible}
        width="80%"
        height="30%"
        onConfirm={useCallback(() => {
          setVersionVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="이용약관"
        modalText="크루 매칭을 통해 같은 대학 소속 사용자 4명이 한 크루가 됩니다.

        배틀 모드에서 타대학 크루와 크루대 크루 포커 아이템 선착순 줍기 미션을 수행하게 됩니다. 
        
        처음에 주어진 5개 라이프는 상대 크루가 먼저 미션을 성공할 때마다 1개씩 차감됩니다.
        
        인벤토리는 크루끼리 공유하며 미션 종료 시마다 인벤토리와 아이템 위치는 초기화 됩니다. 
        
        아이템 위치는 사용자 현위치의 반경 1km이내이며 아이템 사이 최소 간격은 200m입니다.
        
        조커 아이템은 랜덤 효과를 지니고 있습니다.
        
        채팅 사용이 가능하며 타인의 득템 정보를 실시간으로 확인할 수 있습니다.
        
        성별, 키 정보를 통한 걸음 수 검증이나 이동 속도 검증에서 의심을 받지 않도록 주의하여야 합니다. (자전거 및 대중교통 이용 불가)
        
        상대 크루의 라이프가 모두 소진되면 승리한 것이며 진 크루보다 승점 40점을 더 소속 대학 점수판에 더할 수 있습니다."
        isVisible={termsVisible}
        width="100%"
        height="100%"
        onConfirm={useCallback(() => {
          setTermsVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="자주 묻는 질문(FAQ)"
        modalText="자주 묻는 질문(FAQ) 내용 작성..."
        isVisible={FaqVisible}
        width="100%"
        height="100%"
        onConfirm={useCallback(() => {
          setFaqVisible(false)
        })}
      />

      <SettingsModal
        modalTitle="고객센터"
        modalText="고객센터 내용 작성..."
        isVisible={CsVisible}
        width="80%"
        height="70%"
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
        <SettingsButton text="내 정보 수정" />
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
