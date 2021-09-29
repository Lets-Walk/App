import React, { useEffect } from 'react'
import { StatusBar, View, StyleSheet, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './navigations/Stack'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Splash from './screens/Splash'
import SplashScreen from 'react-native-splash-screen'

// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
//   justify-content: center;
//   align-items: center;
// `

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
