import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { View } from 'react-native'

const Stack = createStackNavigator()

const AuthNavigation = ({ setUser }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#00193c' }}>
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
            fontFamily: 'Cafe24Shiningstar.ttf',
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
    </View>
  )
}

export default AuthNavigation
