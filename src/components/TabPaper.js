import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PAPER } from '../constants/walkingmode'
import { Button } from '@ant-design/react-native'
import Animated from 'react-native-reanimated'

const TabPaper = ({ toggleMenu }) => {
  return (
    <>
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
    </>
  )
}

export default TabPaper

const styles = StyleSheet.create({})
