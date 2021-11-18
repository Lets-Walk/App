import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'
import { Freeze, Hide, Ghost } from '../../assets/icons'
import { Joker } from '../../assets/images'

const JokerMission = ({
  jokerMission,
  showJokerMission,
  setShowJokerMission,
}) => {
  console.log(jokerMission)
  const { type } = jokerMission
  if (!type) return <></>

  const missionDesc = {
    Freeze: {
      desc: '프리즈(Freeze)',
      texts: ['주변에 있는 아이템들을', '획득할 수 없습니다.'],
      img: Freeze,
      seconds: 180,
    },
    Hide: {
      desc: '하이드(Hide)',
      texts: ['주변에 있는 아이템들이', '모두 맵에서 사라집니다.'],
      img: Hide,
      seconds: 60,
    },

    Ghost: {
      desc: '고스트(Ghost)',
      texts: ['주변에 있는 아이템들의', '종류를 알 수 없습니다.'],
      img: Ghost,
      seconds: 180,
    },
  }

  const mission = missionDesc[type]

  const onClose = () => {
    setShowJokerMission(false)
  }

  return (
    <Modal
      backdropOpacity={0}
      onBackdropPress={onClose}
      isVisible={showJokerMission}
      style={{ margin: 0 }}
    >
      <View style={{ ...styles.centerView, ...styles.container }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Pressable
              onPress={onClose}
              style={{ position: 'absolute', right: '1%', top: 0 }}
            >
              <Ionicons name="close-outline" size={38} color="#989898" />
            </Pressable>
            <SvgXml
              xml={Joker}
              width={30}
              height={30}
              style={{ position: 'absolute', left: 0, top: 5 }}
            />
            <Text style={{ fontSize: 26, fontFamily: 'BMHANNAAir_ttf' }}>
              조커 효과 발동
            </Text>
          </View>
          <View style={{ alignItems: 'center', flex: 3 }}>
            <Image source={mission.img} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                fontFamily: 'BMHANNAAir_ttf',
                marginTop: 3,
                marginBottom: 3,
              }}
            >
              {mission.desc}
            </Text>
            {mission.texts.map((text, index) => (
              <Text key={index} style={styles.text}>
                {text}
              </Text>
            ))}
            <Text
              style={{
                color: '#989898',
                fontFamily: 'BMHANNAAir_ttf',
              }}
            >{`(지속시간 : ${mission.seconds}초)`}</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default React.memo(JokerMission)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    width: '67%',
    height: '24%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderColor: '#383834',
    borderWidth: 2,
    elevation: 5,
  },
  text: {
    fontSize: 20,
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
