import React, { useState, useEffect } from 'react'
import { StatusBar, View, StyleSheet, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './navigations/Stack'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Splash from './screens/Splash'
import SplashScreen from 'react-native-splash-screen'
import Nmapexample from './Nmapexample'
import axios from 'axios'
import { SERVER_URL, PORT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
//   justify-content: center;
//   align-items: center;
// `

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    SplashScreen.hide()

    //TODO :: 함수 리팩토링 및 auth정보에 따른 Stack 분기 처리하기
    console.log('auth')
    const token = await AsyncStorage.getItem('jwt_token')
    console.log(token)
    axios
      .get(`${SERVER_URL}/api/auth/me`, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('조회 성공')
        console.log(res.data)
      })
      .catch((err) => {
        console.log('조회 실패')
        console.error(err.response.data)
      })
  }, [])

  return (
    // <Nmapexample />
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
