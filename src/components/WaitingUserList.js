import React from 'react'
import WaitingUserInfo from './WaitingUserInfo'
import { View, Dimensions, Text } from 'react-native'

const WaitingUserList = ({ waitingUsers }) => {
  const width = Dimensions.get('window').width
  let key = 1
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: '#D4ECFB',
        height: 120,
        width: width * 0.9,
        borderRadius: 10,
        borderColor: '#989898',
        borderBottomWidth: 1,
      }}
    >
      {waitingUsers.map((user) => (
        <WaitingUserInfo user={user} key={key++} />
      ))}
    </View>
  )
}

export default WaitingUserList
