import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SvgXml } from 'react-native-svg'
import { Misson, Straight } from '../../assets/images/index'
import getMissonImage from '../utils/getMissonImage'

const LabInfo = ({ setVisible }) => {
  const onClose = () => {
    console.log('close button click')
    setVisible(false)
  }

  return (
    <View style={styles.infoConatiner}>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', right: '1%', top: 0 }}
        >
          <Ionicons name="close-outline" size={38} color="gray" />
        </Pressable>
        <SvgXml xml={Misson} width={200} height={200} />
      </View>
      <View style={styles.content}>
        <SvgXml xml={getMissonImage('Onepair')} style={styles.title} />
        <Text style={styles.desc}>무늬와 색에 상관 없이</Text>
        <Text style={styles.desc}>숫자가 일치하는 아이템을 2개 모으세요.</Text>
      </View>
    </View>
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
    elevation: 30,
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

export default LabInfo
