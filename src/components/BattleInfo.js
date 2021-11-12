import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
import CampusLife from './CampusLife'

const InfoContainer = styled.View`
  position: absolute;
  height: 60%;
  width: 90%;
  background-color: #ffffff;
  border-radius: 20px;
  justify-content: space-around;
  flex-direction: row;
  flex: 1;
`

const BattleInfo = () => {
  //TODO : campusName과 life 받아서 CampusLife로 넘기기

  return (
    <View style={styles.container}>
      <InfoContainer
        style={{
          elevation: 15,
        }}
      >
        <View style={styles.content}>
          <CampusLife campusName="중앙대학교" life={3} />
        </View>
        <View style={styles.versusBox}>
          <Text style={styles.versusStyle}>VS</Text>
        </View>
        <View style={styles.content}>
          <CampusLife campusName="중앙대학교" life={2} />
        </View>
      </InfoContainer>
    </View>
  )
}

export default React.memo(BattleInfo)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '18%',
    top: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },
  versusBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versusStyle: {
    fontSize: 24,
    fontFamily: 'BMHANNA_11yrs_ttf',
    color: '#4A4848',
  },
})
