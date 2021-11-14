import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@ant-design/react-native'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Modal from 'react-native-modal'
import { useWindowDimensions } from 'react-native'

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  background-color: #ffffff;
  border-radius: 15px;
`

const SettingsModal = ({
  modalTitle,
  modalText,
  isVisible,
  width,
  height,
  setVisible,
  texts,
  onConfirm = null,
}) => {
  // if (!onConfirm) {
  //   onConfirm = () => setVisible(false)
  // }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onConfirm}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      backdropOpacity={0.5}
      backdropTransitionInTiming={600}
      deviceHeight={useWindowDimensions().height * 1.5}
    >
      <CenterView>
        <Container style={{ width: width, height: height }}>
          <View
            style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}
          >
            <Text style={styles.title}>{modalTitle}</Text>
          </View>
          <ScrollView style={{ width: '95%', marginLeft: 15 }}>
            <Text style={styles.text}>{modalText}</Text>
          </ScrollView>
          <View style={styles.Button}>
            <TouchableOpacity onPress={onConfirm}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#4495D0',
                  fontFamily: 'BMHANNAAir_ttf',
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </CenterView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 25,
    fontWeight: 'bold',
  },
  confirm: {
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#93c5f6',
    borderWidth: 0,
  },
  text: {
    color: 'black',
    fontFamily: 'ONEMobileLight',
    fontSize: 16,
  },
  Button: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 20,
  },
})

export default SettingsModal
