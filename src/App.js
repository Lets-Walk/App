import React, { useState, useEffect } from 'react'
import { StatusBar, View, StyleSheet, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigations/AuthNavigation'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Splash from './screens/Splash'
import SplashScreen from 'react-native-splash-screen'
import Nmapexample from './Nmapexample'
import axios from 'axios'
import { SERVER_URL, PORT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainNavigation from './navigations/MainNavigation'
// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
//   justify-content: center;
//   align-items: center;
// `

const App = () => {
  const [user, setUser] = useState(null)

  const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response = await axios.get(SERVER_URL + '/api/auth/me', {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 10000,
      })
      setUser(response.data.user)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(async () => {
    getCurrentUser()
    SplashScreen.hide()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {user ? <MainNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
