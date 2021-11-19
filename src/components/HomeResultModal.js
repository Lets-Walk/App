import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import { useWindowDimensions } from 'react-native'

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  width: 100%;
  height: 50%;
  background-color: #ffffff;
  border-radius: 15px;
`

const HomeResultModal = ({
  isVisible,
  setVisible,
  date,
  startTime,
  endTime,
  opponent,
  outcome,
  steps,
  members,
  onConfirm = null,
}) => {
  if (!onConfirm) {
    onConfirm = () => setVisible(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onConfirm}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      backdropOpacity={0.5}
      backdropTransitionInTiming={600}
      deviceHeight={useWindowDimensions().height * 1.5}
    >
      <CenterView>
        <Container>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 25,
            }}
          >
            <Text style={styles.title}>
              상{'\t'}세{'\t'}결{'\t'}과
            </Text>
          </View>
          <View style={{ marginRight: 20, marginLeft: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.boldText}>배틀 일시</Text>

              <Text style={styles.text}>
                {date} ({startTime} ~ {endTime})
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.boldText}>함께 한 크루</Text>
              <Text style={styles.text}>
                {members[0]}, {members[1]}, {members[2]}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.boldText}>상대 학교</Text>
              <Text style={styles.text}>{opponent}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.boldText}>나의 걸음수</Text>
              <Text style={styles.text}>{steps}보</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={[styles.boldText, { fontSize: 23 }]}>최종 결과</Text>
              {outcome == 'win' ? (
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 23,
                      fontFamily: 'ONEMobileBold',
                      color: 'red',
                      marginBottom: 0,
                      marginTop: 0,
                    },
                  ]}
                >
                  승리
                </Text>
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 23,
                      fontFamily: 'ONEMobileBold',
                      color: 'blue',
                      marginBottom: 0,
                      marginTop: 0,
                    },
                  ]}
                >
                  패배
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: 10,
              marginTop: '5%',
            }}
          >
            {outcome == 'win' ? (
              <Image
                source={require('../utils/win.png')}
                style={{
                  aspectRatio: 512 / 512,
                  height: '45%',
                }}
              />
            ) : (
              <Text
                style={{
                  fontFamily: 'Cafe24Shiningstar',
                  fontSize: 35,
                  marginTop: '5%',
                  color: '#007EB5',
                }}
              >
                조금만 더 분발하세요!
              </Text>
            )}
          </View>
        </Container>
      </CenterView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: 'ONEMobileBold',
    fontSize: 22,
  },
  confirm: {
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#93c5f6',
    borderWidth: 0,
  },
  text: {
    color: 'black',
    fontFamily: 'ONEMobileRegular',
    fontSize: 17,
    marginBottom: 20,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    flex: 1,
    marginTop: 20,
  },
  boldText: {
    fontFamily: 'ONEMobileBold',
    fontSize: 17,
    marginRight: 15,
  },
})

export default HomeResultModal
