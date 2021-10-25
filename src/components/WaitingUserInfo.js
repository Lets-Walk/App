import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

const WaitingUserInfo = ({ user }) => {
  const { id, nickname, profileUrl } = user

  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={{ uri: profileUrl }}
        style={{ width: 50, height: 50, marginTop: 10 }}
      />
      <Text style={{ fontSize: 18, fontFamily: 'BMHANNAAir_ttf' }}>
        {nickname}
      </Text>
    </View>
  )
}

export default WaitingUserInfo
