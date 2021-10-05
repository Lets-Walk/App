import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CrewNavigation from './CrewNavigation'
import Ranking from '../screens/Ranking';
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="CrewNavigation" component={CrewNavigation} options={{ headerShown: false }}/>
    <Tab.Screen name="Ranking" component={Ranking} options={{ headerShown: false }} />
    <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}

export default MainNavigation
