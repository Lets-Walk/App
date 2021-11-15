import React from 'react'
import StartMatching from '../screens/StartMatching'
import CrewMatching from '../screens/CrewMatching'
import WalkingMode from '../screens/WalkingMode'
import BattleMatching from '../screens/BattleMatching'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const CrewNavigation = ({ user }) => {
  return (
    <Stack.Navigator initialRouteName="StartMatching">
      <Stack.Screen
        name="StartMatching" //워킹크루 매칭 페이지
        options={{ headerShown: false }}
      >
        {(props) => <StartMatching {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="CrewMatching" //크루원 매칭 페이지(매칭 중)
        component={CrewMatching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BattleMatching" //대결 매칭 (타 학교 크루와 매칭 대기 페이지)
        component={BattleMatching}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalkingMode" //워킹모드
        component={WalkingMode}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CrewNavigation
