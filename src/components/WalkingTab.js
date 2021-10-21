import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import TabInventory from './TabInventory'
import { Button } from '@ant-design/react-native'

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 5px;
  margin: 0px 0px;
  overflow: hidden;
`

const ButtonText = styled.Text`
  font-size: 12px;
  align-items: center;

  font-family: BMHANNAAir_ttf;
  padding: 3px 0px;
`

const FinishConfirmText = styled.Text`
  font-size: 28px;
  font-family: BMHANNAAir_ttf;
  color: white;
  margin: 20px 0px;
`

const FinishConfirmButtonText = styled.Text`
  font-size: 20px;
  align-items: center;
  color: yellow;
  font-family: BMHANNAAir_ttf;
  margin: 18px 0px;
`

const WalkingTab = () => {
  const [menuVisible, setMenuVisible] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [menuValue] = useState(new Animated.Value(0))
  const [invValue] = useState(new Animated.Value(100))
  const [paperValue] = useState(new Animated.Value(100))

  const usedNavigation = useNavigation()
  //지금 문제, value값이 변함. 근데 bag을 선택했을땐 bag이 올라오고, paper를 선택했을땐 paper가 올라와야함.
  //지금은 두개를 구분할 수 있는 방법이 없음.
  const toggleMenu = () => {
    Animated.timing(menuValue, {
      toValue: menuVisible ? -100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible)
    })
  }

  const toggleInv = () => {
    Animated.timing(invValue, {
      toValue: menuVisible ? -100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const togglePaper = () => {
    Animated.timing(paperValue, {
      toValue: menuVisible ? -100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const finishModal = () => {
    setModalVisible(!modalVisible)
  }

  const finishWalkingMode = () => {
    // 워킹 모드 종료 후 워킹 데이터 처리, 결과 출력
    // 종료 후 이동화면은 추후 변경

    // navigation stack clear
    usedNavigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  return (
    <Container style={{ shadowColor: '#000000', elevation: 30 }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          transform: [{ translateY: menuValue }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleMenu()
            toggleInv()
          }}
        >
          <MaterialIcons
            name="inventory"
            size={35}
            color="#4495D0"
          ></MaterialIcons>
          <ButtonText>인벤토리</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('PAPER touched')}>
          <Ionicons name="newspaper-outline" size={35} color="black"></Ionicons>
          <ButtonText>페이퍼</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('CHATTING touched')}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={35}
            color="#4495D0"
          ></Ionicons>
          <ButtonText>{'\t'}채팅</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={finishModal}>
          <Ionicons
            name="close-circle-outline"
            size={35}
            color="red"
          ></Ionicons>
          <ButtonText>{'\t'}종료</ButtonText>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          transform: [{ translateY: invValue }],
          overflow: 'hidden',
          top: 100,
        }}
      >
        {/* <TabInventory /> */}
        <Button
          type="primary"
          size={35}
          onPress={() => {
            toggleMenu()
            toggleInv()
          }}
        >
          뒤로가기
        </Button>
      </Animated.View>
      <Modal isVisible={modalVisible}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <FinishConfirmText>워킹모드를 종료하시겠습니까?</FinishConfirmText>

          <TouchableOpacity onPress={(finishModal, finishWalkingMode)}>
            <FinishConfirmButtonText>네, 그만할래요.</FinishConfirmButtonText>
          </TouchableOpacity>
          <TouchableOpacity onPress={finishModal}>
            <FinishConfirmButtonText>
              아니요, 더 할래요.
            </FinishConfirmButtonText>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  )
}

export default WalkingTab

const styles = StyleSheet.create({})
