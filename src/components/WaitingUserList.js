import React from 'react'
import WaitingUserInfo from './WaitingUserInfo'
import { View, Image } from 'react-native'

const WaitingUserList = ({ waitingUsers }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {waitingUsers.map((user) => (
        <WaitingUserInfo user={user} key={user.id} />
      ))}
    </View>
  )
}

export default WaitingUserList
