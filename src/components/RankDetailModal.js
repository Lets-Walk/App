import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Modal from 'react-native-modal'
import { useWindowDimensions } from 'react-native'
import { List } from '@ant-design/react-native'

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  border-radius: 15px;
`
// mockup data
const campusUsers = [
  {
    nickname: 'kevin',
    myScore: 260,
    win: 11,
    lose: 2,
  },
  {
    nickname: 'lee',
    myScore: 240,
    win: 10,
    lose: 3,
  },
  {
    nickname: 'jason',
    myScore: 230,
    win: 9,
    lose: 2,
  },
  {
    nickname: 'kim',
    myScore: 190,
    win: 7,
    lose: 4,
  },
  {
    nickname: 'yoon',
    myScore: 180,
    win: 8,
    lose: 2,
  },
  {
    nickname: 'park',
    myScore: 170,
    win: 7,
    lose: 4,
  },
  {
    nickname: 'alice',
    myScore: 120,
    win: 5,
    lose: 3,
  },
  {
    nickname: 'puang',
    myScore: 110,
    win: 5,
    lose: 2,
  },
  {
    nickname: 'peter',
    myScore: 90,
    win: 4,
    lose: 3,
  },
  {
    nickname: 'julia',
    myScore: 80,
    win: 4,
    lose: 2,
  },
]

const RankDetailModal = ({
  isVisible,
  setVisible,
  campusName,
  campusRank,
  onConfirm = null,
}) => {
  if (!onConfirm) {
    onConfirm = () => setVisible(false)
  }

  let ranker = 1

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
            style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}
          >
            <Text style={styles.title}>
              {campusName} (현재 {campusRank}위)
            </Text>
          </View>

          <List
            renderHeader={
              '\t 사용자명\t\t\t\t기여점수\t\t\t\t\t\t승\t\t\t\t\t\t\t\t\t 패'
            }
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <ScrollView style={{ height: '72%' }}>
              {campusUsers.map((user) => (
                <List.Item key={ranker++}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={styles.list}>
                      <Text style={styles.text}>{user.nickname}</Text>
                    </View>
                    <View style={styles.list}>
                      <Text style={styles.text}>{user.myScore}점</Text>
                    </View>
                    <View style={styles.list}>
                      <Text style={styles.text}>{user.win}</Text>
                    </View>
                    <View style={styles.list}>
                      <Text style={styles.text}>{user.lose}</Text>
                    </View>
                  </View>
                </List.Item>
              ))}
            </ScrollView>
          </List>

          <View style={styles.Button}>
            <TouchableOpacity onPress={onConfirm}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#4495D0',
                  fontFamily: 'BMHANNAAir_ttf',
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </CenterView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 22,
    fontWeight: 'bold',
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
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Button: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
  },
})

export default RankDetailModal
