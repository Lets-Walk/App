import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { Trophy_finish } from '../../assets/icons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import FireCracker from '../animations/FireCracker'

const FinishMode = ({ finishMode, setFinishMode }) => {
  const { winCampus, modalVisible } = finishMode
  const usedNavigation = useNavigation()

  const onPress = () => {
    setFinishMode({
      winCampus: null,
      modalVisible: false,
    })

    usedNavigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  if (!winCampus) return <></>

  return (
    <>
      <Modal backdropOpacity={0} isVisible={modalVisible} style={{ margin: 0 }}>
        <Pressable
          onPress={onPress}
          style={{ ...styles.centerView, ...styles.container }}
        >
          <View style={styles.content}>
            <FireCracker></FireCracker>
            <View
              style={{
                ...styles.centerView,
                flex: 3,
              }}
            >
              <Image
                source={Trophy_finish}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
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
              <Text style={styles.text}>승리했습니다 !</Text>
            </View>
            <View
              style={{
                ...styles.centerView,
                flex: 1,
                flexDirection: 'row',
                marginRight: 3,
              }}
            >
              <MaterialCommunityIcon
                name="location-enter"
                size={24}
                color="#989898"
              />
              <Text style={styles.subText}>TOUCH</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

export default FinishMode

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '67%',
    height: '23%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontFamily: 'BMHANNAAir_ttf',
  },
  subText: {
    marginTop: 3,
    fontSize: 18,
    fontFamily: 'BMHANNAAir_ttf',
    color: '#989898',
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
