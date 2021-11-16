import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native'
import styled, { ServerStyleSheet } from 'styled-components'
import {
  Heart,
  Diamond,
  Spade,
  Clover,
  Inventory as Inv,
} from '../../assets/icons'
import GetMarkerImage from '../utils/getMarkerImage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ItemList from './ItemList'
import getItemType from '../utils/getItemType'
import Pattern from './Pattern'

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`

const Inventory = ({ inventory, toggleInventory, showInventory }) => {
  if (!showInventory) return <></>
  const [itemByPattern, setItems] = useState({
    Spade: [],
    Clover: [],
    Heart: [],
    Diamond: [],
  })

  useEffect(() => {
    const items = { Spade: [], Clover: [], Heart: [], Diamond: [] }
    inventory.map((item) => {
      const pattern = getItemType(item.type)
      const quantity = item.quantity

      for (let i = 0; i < quantity; i++) {
        items[pattern].push(item.type)
      }
    })
    setItems(items)
  }, [inventory])

  //TODO :: 인벤토리 열었을 때 패턴이미지 깜빡이는 문제(svg로 교체 ?)
  //조커 먹었을 때 앱 튕기는 현상. (아이템 획득 부분에서 예외처리 필요)
  //인벤토리 열었을 때의 애니메이션 추가, draggable 가능하면 추가.
  //4인 워킹모드일 때 테스튼 필요.

  return (
    <Container>
      <View style={styles.inventory}>
        <View style={styles.header}>
          <Image source={Inv} style={styles.icon} />
          <Text style={styles.headerFontColor}>INVENTORY</Text>
          <Pressable
            onPress={toggleInventory}
            style={{ position: 'absolute', right: '1%', top: 0 }}
          >
            <Ionicons name="close-outline" size={38} color="#ffffff" />
          </Pressable>
        </View>
        <View
          style={{
            flex: 5,
            flexDirection: 'row',
          }}
        >
          <View style={styles.patternContainer}>
            <Pattern pattern={Clover} />
            <Pattern pattern={Diamond} />
            <Pattern pattern={Heart} />
            <Pattern pattern={Spade} />
          </View>
          <View style={{ flex: 4 }}>
            <ItemList items={itemByPattern.Clover} />
            <ItemList items={itemByPattern.Diamond} />
            <ItemList items={itemByPattern.Heart} />
            <ItemList items={itemByPattern.Spade} />
          </View>
        </View>
      </View>
    </Container>
  )
}

export default React.memo(Inventory)

const styles = StyleSheet.create({
  inventory: {
    width: '68%',
    height: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293241',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  headerFontColor: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'BMHANNA_11yrs_ttf',
    marginRight: 15,
  },
  patternContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#D9D9D9',
    borderRightWidth: 1,
  },
  pattern: {
    flex: 1,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternSize: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
})
