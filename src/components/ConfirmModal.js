import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@ant-design/react-native'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useWindowDimensions } from 'react-native'

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  width: 90%;
  height: 25%;
  background-color: #ffffff;
  border-radius: 15px;
`

const ConfirmModal = ({ isVisible, setVisible, texts, onConfirm = null }) => {
  if (!onConfirm) {
    onConfirm = () => setVisible(false)
  }

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
        <Container>
          <View
            style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}
          >
            <Text style={styles.title}>안 내</Text>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            {texts.map((text) => (
              <Text key={text} style={styles.text}>
                {text}
              </Text>
            ))}
          </View>
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
    fontFamily: 'ONEMobileBold',
    fontSize: 25,
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
    fontFamily: 'ONEMobileRegular',
    fontSize: 18,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default ConfirmModal
