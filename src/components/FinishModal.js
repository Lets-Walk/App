import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import Modal from 'react-native-modal'
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
  const finishWalkingMode = () => {
    BackHandler.exitApp() //앱 종료
    return
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
