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
import AntIcon from 'react-native-vector-icons/AntDesign'
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
  /* padding: 5px; */
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
  const [type, setType] = useState('')
  const [menuValue] = useState(new Animated.Value(0))
  const usedNavigation = useNavigation()

  const INVENTORY = 'inventory'
  const PAPER = 'paper'

  const toggleMenu = (name) => {
    setType(name)
    Animated.timing(menuValue, {
      toValue: menuVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible)
    })
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

  //React.Memo 사용해서 렌더 두번되는거 방지하기.
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
        <TouchableOpacity onPress={() => toggleMenu(INVENTORY)}>
          <AntIcon name="enviromento" size={35} color="#545f66"></AntIcon>
          <ButtonText>인벤토리</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMenu(PAPER)}>
          <Ionicons
            name="newspaper-outline"
            size={35}
            color="#545f66"
          ></Ionicons>
          <ButtonText>페이퍼</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('CHATTING touched')}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={35}
            color="#545f66"
          ></Ionicons>
          <ButtonText>{'\t'}채팅</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity onPress={finishModal}>
          <Ionicons
            name="close-circle-outline"
            size={35}
            color="#e76f51"
          ></Ionicons>
          <ButtonText>{'\t'}종료</ButtonText>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ translateY: type === INVENTORY ? menuValue : 0 }],
          top: 100,
        }}
      >
        {/* <TabInventory /> */}
        <Button
          type="primary"
          size={35}
          onPress={() => {
            toggleMenu(INVENTORY)
          }}
        >
          뒤로가기
        </Button>
        <Text>인벤토리</Text>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ translateY: type === PAPER ? menuValue : 0 }],
          top: 100,
        }}
      >
        <Button
          type="primary"
          size={35}
          onPress={() => {
            toggleMenu(PAPER)
          }}
        >
          뒤로가기
        </Button>
        <Text>페이퍼</Text>
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
