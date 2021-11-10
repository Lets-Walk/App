import React from 'react'
import { Text, View, Image } from 'react-native'
import ReadyTag from './ReadyTag'

const WaitingUserInfo = ({ user }) => {
  const { id, nickname, profileUrl, isReady } = user

  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={{ uri: profileUrl }}
        style={{ width: 50, height: 50, marginBottom: 5, borderRadius: 30 }}
      />
      <Text style={{ fontSize: 18, fontFamily: 'BMHANNAAir_ttf' }}>
        {nickname}
      </Text>
      {isReady && <ReadyTag />}
    </View>
  )
}

export default WaitingUserInfo
