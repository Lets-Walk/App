import React from 'react'
import WaitingUserInfo from './WaitingUserInfo'
import { View, Dimensions } from 'react-native'

const WaitingUserList = ({ waitingUsers }) => {
  const width = Dimensions.get('window').width
  let key = 1
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15,
        backgroundColor: '#D7EEFF',
        height: 120,
        width: width * 0.9,
        borderRadius: 10,
      }}
    >
      {waitingUsers.map((user) => (
        <WaitingUserInfo user={user} key={key++} />
      ))}
    </View>
  )
}

export default WaitingUserList