import { Button } from '@ant-design/react-native'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { INVENTORY } from '../constants/walkingmode'

const TabInventory = ({ toggleMenu }) => {
  return (
    <>
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
    </>
  )
}

export default React.memo(TabInventory)

const styles = StyleSheet.create({})
