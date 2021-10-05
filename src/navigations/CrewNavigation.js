import React from 'react'
import {View, Text} from 'react-native'
import CrewMatching from '../screens/CrewMatching'
import NowMatching from '../screens/NowMatching'
import WalkingMode from '../screens/WalkingMode'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

//TODO
//매칭 중 페이지, 워킹모드 페이지
const CrewNavigation = () => {
    return (
    <Stack.Navigator> 
            <Stack.Screen name="크루매칭" component={CrewMatching} options={{ headerShown: false }}/>
            <Stack.Screen name="매칭중" component={NowMatching} options={{ headerShown: false }}/>
            <Stack.Screen name="워킹모드" component={WalkingMode}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  }

  
export default CrewNavigation