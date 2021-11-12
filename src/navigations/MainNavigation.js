import React from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import Home from '../screens/Home'
import CrewNavigation from './CrewNavigation'
import Ranking from '../screens/Ranking'
import Setting from '../screens/Setting'

const Tab = createBottomTabNavigator()

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route)
  const hideOnScreens = ['CrewMatching', 'BattleMatching', 'WalkingMode'] //탭바 안보이게 하려는 Screen 이름
  if (hideOnScreens.indexOf(routeName) > -1) return false
  return true
}

const MainNavigation = ({ user }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home" //initial screen
      tabBarOptions={{
        showLabel: false, //탭 아이콘 라벨
        activeTintColor: '#001d40', //탭 focus 색깔
        activeBackgroundColor: '#c8eef9',
        inactiveBackgroundColor: '#001d40',
        style: {
          // 탭 스타일
          position: 'absolute',
          height: '8%',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EntypoIcon name="home" color={color} size={size} />
          ),
        }}
      >
        {(props) => <Home {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="CrewNavigation"
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon name="walking" color={color} size={size} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      >
        {(props) => <CrewNavigation {...props} user={user} />}
      </Tab.Screen>
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
