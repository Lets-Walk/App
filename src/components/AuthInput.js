import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useWindowDimensions } from 'react-native'

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.text};
`

const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  margin: 5px 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #d4edfd;
  font-size: 20px;
  color: #000000;
  margin-bottom: 0px;
`

const AuthInput = ({ label, placeholder, isPassword, onChangeText }) => {
  const width = useWindowDimensions().width
  return (
    <Container>
      <Label style={{ fontFamily: 'BMHANNAAir_ttf' }}>{label}</Label>
      <StyledInput
        width={width}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
      />
    </Container>
  )
}

export default AuthInput
