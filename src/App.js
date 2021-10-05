import React, { useState, useEffect } from 'react'
import { StatusBar, View, StyleSheet, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigations/AuthNavigation'
import SplashScreen from 'react-native-splash-screen'
import MainNavigation from './navigations/MainNavigation'
import auth from './utils/auth'
import { ActivityIndicator } from '@ant-design/react-native'
// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
//   justify-content: center;
//   align-items: center;
// `

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    // await auth(setUser)
    setLoading(false)
    setUser({name : 'test', email : 'test@test.com'})
    SplashScreen.hide()
  }, [])

  // TODO :: setUser로 user로그인 하는 대신 글로벌 state로 관리하기.
  if (loading) return <ActivityIndicator toast text="Loading..." size="large" />
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {user ? <MainNavigation /> : <AuthNavigation setUser={setUser} />}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
