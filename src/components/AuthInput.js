import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useWindowDimensions } from 'react-native'

const Container = styled.View`
  width: 100%;
  margin: 10px;
`

const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #d4edfd;
  font-size: 20px;
  color: #000000;
`

const AuthInput = ({ placeholder, isPassword, onChangeText }) => {
  return (
    <Container>
      <StyledInput
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </Container>
  )
}

export default AuthInput
