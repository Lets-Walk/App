import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { INVENTORY, PAPER } from '../constants/walkingmode'

const ButtonText = styled.Text`
  font-size: 15px;
  font-family: BMHANNAAir_ttf;
  padding-top: 3px;
`

const TabMenu = ({ toggleModal, toggleMenu }) => {
  console.log('menu')
  return (
    <>
      <TouchableOpacity
        style={styles.centerView}
        onPress={() => toggleMenu(INVENTORY)}
      >
        <Ionicons name="briefcase-outline" size={35} color="#001219" />
        <ButtonText>인벤토리</ButtonText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centerView}
        onPress={() => toggleMenu(PAPER)}
      >
        <Ionicons name="newspaper-outline" size={35} color="#001219"></Ionicons>
        <ButtonText>페이퍼</ButtonText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centerView}
        onPress={() => console.log('CHATTING touched')}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={35}
          color="#001219"
        ></Ionicons>
        <ButtonText>채팅</ButtonText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerView} onPress={toggleModal}>
        <Ionicons
          name="close-circle-outline"
          size={35}
          color="#ae2012"
        ></Ionicons>
        <ButtonText>종료</ButtonText>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

export default TabMenu
