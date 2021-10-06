import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@ant-design/react-native'
import { Text, StyleSheet, View } from 'react-native'

const CenterView = styled.View`
	flex : 1
	justify-content: center;
	align-items: center;
`
const Container = styled.View`
  width: 90%;
  height: 35%;
  background-color: #145da0;
  border-radius: 5px;
`

const LoginError = ({ toggleModalVisible }) => {
  return (
    <CenterView>
      <Container>
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}>
          <Text style={styles.title}>안내</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>로그인에 실패하였습니다</Text>
          <Text style={styles.text}>이메일과 비밀번호를 확인해주세요.</Text>
        </View>
        <View style={styles.Button}>
          <Button
            type="ghost"
            style={styles.confirm}
            onPress={() => {
              toggleModalVisible()
            }}
          >
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

export default LoginError
