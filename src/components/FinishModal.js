import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'

const FinishConfirmText = styled.Text`
  font-size: 28px;
  font-family: BMHANNAAir_ttf;
  color: white;
  margin: 20px 0px;
`

const FinishConfirmButtonText = styled.Text`
  font-size: 20px;
  align-items: center;
  color: yellow;
  font-family: BMHANNAAir_ttf;
  margin: 18px 0px;
`

const FinishModal = ({ modalVisible, toggleModal }) => {
  const usedNavigation = useNavigation()

  const finishWalkingMode = () => {
    // 워킹 모드 종료 후 워킹 데이터 처리, 결과 출력
    // 종료 후 이동화면은 추후 변경

    // navigation stack clear
    usedNavigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  return (
    <Modal isVisible={modalVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FinishConfirmText>워킹모드를 종료하시겠습니까?</FinishConfirmText>

        <TouchableOpacity onPress={(toggleModal, finishWalkingMode)}>
          <FinishConfirmButtonText>네, 그만할래요.</FinishConfirmButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <FinishConfirmButtonText>아니요, 더 할래요.</FinishConfirmButtonText>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default React.memo(FinishModal)

const styles = StyleSheet.create({})
