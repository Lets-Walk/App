import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@ant-design/react-native'
import { Text, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  width: 90%;
  height: 35%;
  background-color: #145da0;
  border-radius: 5px;
`

const ConfirmModal = ({ isVisible, setVisible, texts, onConfirm = null }) => {
  if (!onConfirm) {
    onConfirm = () => setVisible(false)
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onConfirm}>
      <CenterView>
        <Container>
          <View
            style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}
          >
            <Text style={styles.title}>안내</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            {texts.map((text) => (
              <Text key={text} style={styles.text}>
                {text}
              </Text>
            ))}
          </View>
          <View style={styles.Button}>
            <Button type="ghost" style={styles.confirm} onPress={onConfirm}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  fontFamily: 'BMHANNAAir_ttf',
                }}
              >
                확인
              </Text>
            </Button>
          </View>
        </Container>
      </CenterView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 35,
    fontWeight: 'bold',
  },
  confirm: {
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#121212',
  },
  text: {
    color: 'white',
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 19,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
})

export default ConfirmModal
