import React, { useCallback, useState, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import {
  Computer,
  Pencil,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  RedPaper,
  BluePaper,
  WhitePaper,
} from '../icons'
import { Button } from '@ant-design/react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconComponent from './IconComponent'

const LabInfo = ({ name, ingredient, setVisible }) => {
  if (!ingredient) return <></>
  const itemList = ingredient[name]
  if (!itemList) return <></>

  const onClose = () => {
    console.log('close button click')
    setVisible(false)
  }

  const startConfirm = () => {
    console.log('연구시작 버튼 클릭')
  }

  return (
    <View style={styles.infoConatiner}>
      <View style={styles.header}>
        <IconComponent name={name} text={false} size={35}/>
        <Text style={styles.title}>{name} 연구실</Text>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', right: '1%', top: 0 }}
        >
          <Ionicons name="close-outline" size={38} color="gray" />
        </Pressable>
      </View>
      <View style={styles.divider}>
        <View
          style={{
            paddingTop: '4%',
            marginBottom: '4%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 23, fontFamily: 'BMHANNAAir_ttf' }}>
            필요한 재료
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {itemList.map((item, index) => (
            <IconComponent key={index} name={item} iconSize={38} bgSize={60} />
          ))}
        </View>
        <View style={styles.centerView}>
          <Button
            activeStyle={{}}
            onPress={startConfirm}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>연구시작</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoConatiner: {
    position: 'absolute',
    width: '100%',
    height: '47%',
    bottom: 0,
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 30,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingRight: 35,
  },
  title: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 40,
    fontFamily: 'BMHANNAAir_ttf',
  },
  divider: {
    flex: 3,
    borderColor: 'gray',
    borderTopWidth: 0.6,
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '40%',
    height: '80%',
    borderRadius: 30,
    backgroundColor: '#332F2F',
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'BMHANNAAir_ttf',
  },
})

export default LabInfo
