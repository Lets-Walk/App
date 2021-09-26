import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Image } from 'react-native'
import Icon from '../../assets/images/icon.png'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const Splash = () => {
  return (
    <Container>
      <Text
        style={{
          fontSize: 30,
          color: '#ffffff',
          fontFamily: 'BMHANNAAir_ttf',
          marginBottom: 10,
        }}
      >
        걷기 대학대항전
      </Text>
      <Text
        style={{
          fontSize: 60,
          color: '#ffffff',
          fontFamily: 'BMHANNAAir_ttf',
          marginBottom: 5,
        }}
      >
        걷고 땅 먹고
      </Text>
      <Image
        source={Icon}
        resizeMode="contain"
        style={{ width: 200, height: 200 }}
      />
    </Container>
  )
}

export default Splash
