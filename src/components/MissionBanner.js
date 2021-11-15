import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Medal } from '../../assets/icons'

const MissionBanner = ({ missionBannerToggle }) => {
  return (
    <Pressable onPress={missionBannerToggle} style={styles.missionButton}>
      <Image source={Medal} style={styles.missionIcon} />
    </Pressable>
  )
}

export default React.memo(MissionBanner)

const styles = StyleSheet.create({
  missionButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 60,
    right: '5%',
    top: '13%',
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionIcon: {
    width: 30,
    height: 30,
  },
})
