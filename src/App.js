import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigations/AuthNavigation'
import SplashScreen from 'react-native-splash-screen'
import MainNavigation from './navigations/MainNavigation'
import auth from './utils/auth'
import { ActivityIndicator } from '@ant-design/react-native'
import requestPermission from './utils/requestPermission'
import './log'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    await auth(setUser) //스플래시 무한로딩이면 주석처리하기
    setLoading(false)
    SplashScreen.hide()
    await requestPermission() //위치 권한 요청
  }, [])

  // TODO :: setUser로 user로그인 하는 대신 글로벌 state로 관리하기.
  if (loading) return <ActivityIndicator toast text="Loading..." size="large" />
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {user ? (
          <>
            <StatusBar barStyle="dark-content" backgroundColor="#f6f6f9" />
            <MainNavigation user={user} />
          </>
        ) : (
          <>
            <StatusBar barStyle="dark-content" backgroundColor="#b7daf1" />
            <AuthNavigation setUser={setUser} />
          </>
        )}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
