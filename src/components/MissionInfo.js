import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SvgXml } from 'react-native-svg'
import { Mission } from '../../assets/images/index'
import getMissionImage from '../utils/getMissionImage'

const missionDesc = {
  Onepair: ['무늬와 색에 상관 없이', '숫자가 일치하는 아이템을 2개 모으세요.'],
  Twopair: ['숫자가 일치하는 아이템 2개인', '원페어를 2쌍 모으세요.'],
  Triple: ['무늬와 색에 상관 없이', '숫자가 일치하는 아이템을 3개 모으세요.'],
  Fourcard: ['무늬와 색에 상관 없이', '숫자가 일치하는 아이템을 4개 모으세요.'],
  Flush: ['숫자와 상관 없이', '같은 무늬의 아이템을 5개 모으세요'],
  Straight: ['무늬와 색에 상관 없이', '연속되는 숫자 아이템 5개를 모으세요.'],
  Fullhouse: ['무늬와 색에 상관 없이', '같은 숫자 3개와 2개를 각각 모으세요.'],
}

const MissionInfo = ({ infoVisible, setInfoVisible, name }) => {
  const onClose = () => {
    console.log('close button click')
    setInfoVisible(false)
  }

  if (!name) return <></>
  const desc = missionDesc[name]

  return (
    <Modal
      backdropOpacity={0}
      onBackdropPress={() => {
        setInfoVisible(false)
      }}
      isVisible={infoVisible}
      style={{ margin: 0 }}
    >
      <View style={styles.infoConatiner}>
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            style={{ position: 'absolute', right: '1%', top: 0 }}
          >
            <Ionicons name="close-outline" size={38} color="gray" />
          </Pressable>
          <SvgXml xml={Mission} width={200} height={200} />
        </View>
        <View style={styles.content}>
          <SvgXml xml={getMissionImage(name)} style={styles.title} />
          {desc.map((text, index) => (
            <Text key={index} style={styles.desc}>
              {text}
            </Text>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  infoConatiner: {
    position: 'absolute',
    width: '100%',
    height: '23%',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    elevation: 15,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 2,
    alignItems: 'center',
  },
  desc: {
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 18,
    color: 'gray',
  },
  title: {
    top: 10,
    marginBottom: 23,
  },
})

export default MissionInfo
