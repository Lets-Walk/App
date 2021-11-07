import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'

const Stack = createStackNavigator()

const AuthNavigation = ({ setUser }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 60,
          backgroundColor: '#00193c',
          borderWidth: 0,
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: '200',
          fontFamily: 'BMHANNAAir_ttf',
          fontSize: 25,
        },
        headerTitleAlign: 'center',
        headerTitle: '회원가입',
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <Login {...props} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="회원가입" component={Signup} />
    </Stack.Navigator>
  )
}

export default AuthNavigation
