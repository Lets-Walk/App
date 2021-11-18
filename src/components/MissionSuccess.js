import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { Trophy } from '../../assets/icons'

const MissionSuccess = ({ successMission, setSuccessMission }) => {
  const { winCampus, modalVisible } = successMission

  const onClose = () => {
    setSuccessMission({
      winCampus: null,
      modalVisible: false,
    })
  }

  if (!winCampus) return <></>

  return (
    <Modal
      backdropOpacity={0}
      onBackdropPress={onClose}
      isVisible={modalVisible}
      style={{ margin: 0 }}
    >
      <View style={{ ...styles.centerView, ...styles.container }}>
        <View style={styles.content}>
          <View
            style={{
              ...styles.centerView,
              flex: 3,
            }}
          >
            <Image
              source={Trophy}
              style={{
                width: 70,
                height: 70,
              }}
            />
            <Pressable
              onPress={onClose}
              style={{ position: 'absolute', right: '1%', top: 0 }}
            >
              <Ionicons name="close-outline" size={38} color="#989898" />
            </Pressable>
          </View>
          <View
            style={{
              ...styles.centerView,
              flex: 2,
            }}
          >
            <Text style={styles.text}>
              <Text style={{ ...styles.text, color: '#FABE2C' }}>
                {winCampus + ' '}
              </Text>
              크루가
            </Text>
            <Text style={styles.text}>미션을 완료했습니다</Text>
          </View>
          <View
            style={{
              ...styles.centerView,
              flex: 1,
            }}
          >
            <Text style={styles.subText}>
              아이템과 인벤토리는 초기화 됩니다
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default React.memo(MissionSuccess)

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
