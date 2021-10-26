import React from 'react'
import { Text, View, Image } from 'react-native'

const WaitingUserInfo = ({ user }) => {
  const { id, nickname, profileUrl } = user

  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={{ uri: profileUrl }}
        style={{ width: 50, height: 50, marginBottom: 5 }}
      />
      <Text style={{ fontSize: 18, fontFamily: 'BMHANNAAir_ttf' }}>
        {nickname}
      </Text>
    </View>
  )
}

export default WaitingUserInfo
