import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Joker } from '../../assets/images'

const JokerTimer = ({ showJokerTimer, jokerTimerCount }) => {
  if (!showJokerTimer) return <></>
  return (
    <View style={styles.blackBox}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <SvgXml xml={Joker} width={18} height={18} style={{ left: 3 }} />
        <Text style={styles.font}>
          {`${parseInt(jokerTimerCount / 60)} : ${parseInt(
            jokerTimerCount % 60,
          )}`}
        </Text>
      </View>
    </View>
  )
}

export default React.memo(JokerTimer)

const styles = StyleSheet.create({
  blackBox: {
    top: '13%',
    left: '5%',
    width: 90,
    height: 30,
    borderRadius: 20,
    borderColor: '#383834',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },

  font: {
    color: 'black',
    fontSize: 20,
    bottom: 2,
    marginLeft: 8,
  },
})
