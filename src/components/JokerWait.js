import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'
import { Trophy } from '../../assets/icons'
import { Joker } from '../../assets/images'
import Loading from '../animations/Loading'

const JokerWait = ({ modalVisible }) => {
  return (
    <Modal backdropOpacity={0} isVisible={modalVisible} style={{ margin: 0 }}>
      <View style={{ ...styles.centerView, ...styles.container }}>
        <View style={styles.content}>
          <View
            style={{
              ...styles.centerView,
              flex: 1,
            }}
          >
            <SvgXml xml={Joker} width={30} height={30} />
          </View>
          <View
            style={{
              ...styles.centerView,
              flex: 1,
            }}
          >
            <Text style={styles.text}>잠시 후 랜덤으로</Text>
            <Text style={styles.text}>조커 효과가 적용됩니다</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Loading
              style={{ width: '100%', position: 'absolute', bottom: -20 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default React.memo(JokerWait)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '67%',
    height: '20%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderColor: '#383834',
    borderWidth: 2,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontFamily: 'BMHANNAAir_ttf',
  },
  subText: {
    fontSize: 15,
    fontFamily: 'BMHANNAAir_ttf',
    color: '#989898',
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
