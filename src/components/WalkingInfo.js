import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const InfoContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 17%;
  width: 42%;
  background-color: #ffffff;
  padding: 3px 5px;
  border-radius: 10px;
  justify-content: space-around;
  flex: 1;
`

const Box = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const IconContainer = styled.View`
  left: 7%;
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

const WalkingInfo = ({ walkingTime, steps }) => {
  console.log('walking info render')
  return (
    <InfoContainer
      style={{
        shadowColor: '#000000',
        elevation: 10,
      }}
    >
      <Box>
        <IconContainer color="#3D4ABA">
          <MaterialCmIcons name="timer-outline" color="white" size={20} />
        </IconContainer>
        <View style={styles.infoBox}>
          <Text style={styles.time}>{Math.floor(walkingTime / 60)}</Text>
          <Text style={styles.timeText}>시간</Text>
          <Text style={styles.time}>{Math.floor(walkingTime % 60)}</Text>
          <Text style={styles.timeText}>분</Text>
        </View>
      </Box>
      <Box>
        <IconContainer color="#07E092">
          <FontAwesome5Icon name="walking" color="white" size={20} />
        </IconContainer>
        <View style={styles.infoBox}>
          <Text style={styles.step}>{steps}</Text>
          <Text style={styles.stepText}>걸음</Text>
        </View>
      </Box>
    </InfoContainer>
  )
}

export default React.memo(WalkingInfo)

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5%',
    paddingLeft: 5,
  },
  time: {
    fontSize: 32,
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
  step: {
    flex: 1,
    paddingRight: 2,
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'right',
  },
  stepText: {
    top: '4%',
    marginRight: '7%',
    fontSize: 20,
    fontFamily: 'BMHANNAAir_ttf',
    color: 'grey',
  },
})
