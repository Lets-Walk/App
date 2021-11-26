import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { View } from 'react-native'
import OnBoarding from '../screens/OnBoarding'

const Stack = createStackNavigator()

const AuthNavigation = ({ setUser }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#00193c' }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 60,
            backgroundColor: '#ffffff',
            borderWidth: 0,
          },
          headerTitleStyle: {
            color: 'black',

            fontFamily: 'ONEMobileBold',
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTitle: '워크투게더 회원가입',
        }}
      >
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="회원가입" component={Signup} />
      </Stack.Navigator>
    </View>
  )
}

export default AuthNavigation
