import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useWindowDimensions } from 'react-native'

const Container = styled.View`
  width: 100%;
  margin: 10px 0;
`

const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: #ededed;
  font-size: 20px;
  color: #000000;
`

const AuthInput = ({ placeholder, isPassword, onChangeText, value }) => {
  return (
    <Container>
      <StyledInput
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        autoCapitalize="none"
        value={value}
      />
    </Container>
  )
}

export default AuthInput
