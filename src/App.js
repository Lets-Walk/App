import React from 'react'
import { StatusBar, View, StyleSheet, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Splash from './screens/Splash'

// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
//   justify-content: center;
//   align-items: center;
// `

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  )
}

export default App
