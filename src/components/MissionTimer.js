import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
`

const MissionTimer = ({ count }) => {
  return (
    <Container>
      <View style={styles.blackBox}>
        <Text style={styles.font}>미션을 생성중 입니다.</Text>
        <Text style={styles.font}>
          {
            <Text
              style={{
                ...styles.font,
                fontSize: 25,
                color: 'yellow',
              }}
            >
              {count}초
            </Text>
          }
          후에 미션이 공개됩니다.
        </Text>
      </View>
    </Container>
  )
}

export default React.memo(MissionTimer)

const styles = StyleSheet.create({
  blackBox: {
    width: '60%',
    height: '15%',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
  },

  font: {
    fontFamily: 'BMHANNAAir_ttf',
    color: 'white',
    fontSize: 20,
  },
})
