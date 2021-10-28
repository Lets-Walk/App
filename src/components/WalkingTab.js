import React, { useState, useCallback, useRef } from 'react'
import { Animated, View } from 'react-native'
import styled from 'styled-components/native'

import TabInventory from './TabInventory'
import TabMenu from './TabMenu'
import TabPaper from './TabPaper'
import FinishModal from './FinishModal'
import { INVENTORY, PAPER } from '../constants/walkingmode'

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 0px;
  margin: 0px 0px;
  overflow: hidden;
`

const MenuView = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const ItemView = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  top: 100px;
`

const WalkingTab = ({ inventory }) => {
  const [menuVisible, setMenuVisible] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [type, setType] = useState('')
  const [animation] = useState(new Animated.Value(0))

  const toggleMenu = useCallback(
    (name) => {
      setType(name)
      Animated.timing(animation, {
        toValue: menuVisible ? -100 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(!menuVisible)
      })
    },
    [menuVisible],
  )

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible)
  }, [modalVisible])

  return (
    <Container style={{ shadowColor: '#000000', elevation: 30 }}>
      <MenuView style={{ transform: [{ translateY: animation }] }}>
        <TabMenu toggleModal={toggleModal} toggleMenu={toggleMenu} />
      </MenuView>
      <ItemView
        style={{
          transform: [{ translateY: type === INVENTORY ? animation : 0 }],
        }}
      >
        <TabInventory inventory={inventory} toggleMenu={toggleMenu} />
      </ItemView>
      <ItemView
        style={{
          transform: [{ translateY: type === PAPER ? animation : 0 }],
        }}
      >
        <TabPaper toggleMenu={toggleMenu} />
      </ItemView>
      <FinishModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </Container>
  )
}

export default React.memo(WalkingTab)
