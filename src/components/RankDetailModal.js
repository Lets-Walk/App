import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import Modal from 'react-native-modal'
import { useWindowDimensions } from 'react-native'
import { ActivityIndicator, List } from '@ant-design/react-native'
import axios from 'axios'
import { SERVER_URL } from '@env'

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
const RankDetailModal = ({
  isVisible,
  setVisible,
  campusData,
  onConfirm = null,
}) => {
  if (!campusData) return <></>
  if (!onConfirm) {
    onConfirm = () => setVisible(false)
  }

  const {
    campus: campusName,
    rank: campusRank,
    id: campusId,
    image: campusImage,
  } = campusData
  let ranker = 1
  const [campusUsers, setCampusUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    try {
      setLoading(true)
      const result = await axios.get(
        SERVER_URL + `/api/campus/${campusId}/members`,
        {
          timeout: 5000,
        },
      )
      const users = result.data.data
      // console.log(users)
      setCampusUsers(users)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [campusData])

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
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={{ uri: SERVER_URL + '/static/logos/' + campusImage }}
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
            <Text style={styles.title}>
              {campusName} (현재 {campusRank}위)
            </Text>
          </View>
          <View style={{ flex: 8 }}>
            <List
              renderHeader={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgb(245, 245, 249)',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ flex: 2, textAlign: 'right' }}>사용자명</Text>
                  <Text style={{ flex: 3, textAlign: 'center' }}>기여점수</Text>
                  <Text style={{ flex: 1, textAlign: 'left' }}>승</Text>
                  <Text style={{ flex: 1, textAlign: 'left' }}>패</Text>
                </View>
              )}
              // style={{ marginLeft: 10, marginRight: 10 }}
            >
              <ScrollView>
                {loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  campusUsers.map((user) => (
                    <List.Item key={ranker++}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space-between',
                        }}
                      >
                        <View style={[styles.list, { flex: 2 }]}>
                          <Text style={styles.text} numberOfLines={1}>
                            {user.nickname}
                          </Text>
                        </View>
                        <View style={[styles.list, { flex: 2 }]}>
                          <Text style={styles.text}>
                            {user.Walk.contribution}점
                          </Text>
                        </View>
                        <View style={[styles.list, { flex: 1 }]}>
                          <Text style={styles.text}>
                            {user.Walk.wincount}승
                          </Text>
                        </View>
                        <View style={[styles.list, { flex: 1 }]}>
                          <Text style={styles.text}>
                            {user.Walk.losecount}패
                          </Text>
                        </View>
                      </View>
                    </List.Item>
                  ))
                )}
              </ScrollView>
            </List>
          </View>
          <View style={{ flex: 1 }}>
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
  CenterView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default React.memo(RankDetailModal)
