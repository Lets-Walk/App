import React, { useCallback } from 'react'
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

const ingredient = {
  공과대학: ['Pencil', 'Computer'],
  자연과학대학: ['Pencil', 'Microscope'],
  인문대학: ['Pencil', 'Book'],
  경영대학: ['Pencil', 'Calculator'],
  의과대학: ['Pencil', 'Stethoscope'],
  약학대학: ['Pencil', 'Pill'],
}

const maapingIcon = {
  Pencil,
  Computer,
  Microscope,
  Book,
  Calculator,
  Stethoscope,
  Pill,
  공과대학: RedPaper,
  자연과학대학: RedPaper,
  인문대학: BluePaper,
  경영대학: BluePaper,
  의과대학: WhitePaper,
  약학대학: WhitePaper,
}

const LabInfo = ({ name }) => {
  const onClose = () => {
    console.log('close button click')
  }

  const startConfirm = () => {
    console.log('연구시작 버튼 클릭')
  }

  const getIconComponent = useCallback((name) => {
    const IconComponent = maapingIcon[name]
    return <IconComponent />
  }, [])

  const itemList = ingredient[name]
  if (!itemList) return <View></View>
  return (
    <View style={styles.infoConatiner}>
      <View style={styles.header}>
        {getIconComponent(name)}
        <Text style={styles.title}>{name} 연구실</Text>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', right: '3%', top: 0 }}
        >
          <Text style={{ fontSize: 30, color: 'gray' }}>X</Text>
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
          {itemList.map((item) => getIconComponent(item, 38))}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16.0,
    elevation: 50,
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
