import React from 'react'
import CrewMatching from '../screens/CrewMatching'
import NowMatching from '../screens/NowMatching'
import WalkingMode from '../screens/WalkingMode'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const CrewNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="크루매칭">
      <Stack.Screen
        name="크루매칭"
        component={CrewMatching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="매칭중"
        component={NowMatching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="워킹모드"
        component={WalkingMode}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CrewNavigation
