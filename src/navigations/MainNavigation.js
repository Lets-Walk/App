import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import Home from '../screens/Home'
import CrewNavigation from './CrewNavigation'
import Ranking from '../screens/Ranking'
import Setting from '../screens/Setting'
import { color } from 'react-native-reanimated'

const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" //initial screen
      screenOptions={{
        tabBarShowLabel: false, //탭 아이콘 라벨
        tabBarActiveTintColor: '#1B97E2', //탭 focus 색깔
        tabBarStyle: {
          position: 'absolute',
          width: '100%',
          height: '10%',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EntypoIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CrewNavigation"
        component={CrewNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon name="walking" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IoniconsIcon name="trophy-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IoniconsIcon name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigation
