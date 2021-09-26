import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native'

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
`

const Login = ({ navigation }) => {
  return (
    <Container>
      <Text
        style={{
          fontSize: 30,
          color: '#ffffff',
          fontFamily: 'BMHANNAAir_ttf',
        }}
      >
        Login
      </Text>
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  )
}

export default Login
