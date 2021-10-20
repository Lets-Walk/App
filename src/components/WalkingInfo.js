import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const InfoContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 17%;
  width: 43%;
  background-color: #ffffff;
  padding: 3px 5px;
  border-radius: 10px;
  justify-content: space-around;
  flex: 1;
  /* border-width: 1px; */
  /* border-color: #4495d0; */
`

const WalkTime = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

// walking time sample data
const walkingTime = 120
const steps = 1000

const WalkingInfo = () => {
  return (
    <InfoContainer
      style={{
        shadowColor: '#000000',
        elevation: 10,
      }}
    >
      <WalkTime>
        <View style={styles.icon}>
          <MaterialCmIcons name="timer-outline" color="white" size={20} />
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.time}>{Math.floor(walkingTime / 60)}</Text>
          <Text style={styles.timeText}>시간</Text>
          <Text style={styles.time}>{Math.floor(walkingTime % 60)}</Text>
          <Text style={styles.timeText}>분</Text>
        </View>
      </WalkTime>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>걸음</Text>
      </View>
    </InfoContainer>
  )
}

export default WalkingInfo

const styles = StyleSheet.create({
  icon: {
    left: '7%',
    width: 30,
    height: 30,
    backgroundColor: '#3D4ABA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
  timeBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5%',
    paddingLeft: 5,
  },
  time: {
    fontSize: 35,
    fontWeight: '500',
    paddingRight: 2,
  },
  timeText: {
    top: '6%',
    right: '5%',
    fontSize: 20,
    fontFamily: 'BMHANNAAir_ttf',
    color: 'grey',
    paddingRight: 3,
  },
})
