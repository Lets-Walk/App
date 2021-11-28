import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import ScreenName from '../components/ScreenName'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { List } from '@ant-design/react-native'
import Confetti from '../animations/Confetti'
import RankDetailModal from '../components/RankDetailModal'
import { SERVER_URL } from '@env'

var today = new Date() // 오늘 날짜
var dday = new Date(2021, 12 - 1, 31) // 2021.12.31 (월은 -1)
var gap = dday.getTime() - today.getTime()
var remaining = Math.ceil(gap / (1000 * 60 * 60 * 24))

const Ranking = ({ user }) => {
  const startDate = '2021.12.01'
  const endDate = '2021.12.31'
  const userCampus = user.Campus.name

  const isFocused = useIsFocused()

  useEffect(async () => {
    if (!isFocused) return
    console.log('refresh campus ranking')
    try {
      const result = await axios.get(SERVER_URL + '/api/campus/rank', {
        timeout: 5000,
      })
      const rankData = result.data.data
      rankData.map((rank, idx) => (rank.rank = idx + 1))
      setRanks(rankData)
    } catch (err) {
      console.log(err)
    }
  }, [isFocused])
  const [ranks, setRanks] = useState([]) // mockup data

  const _handleDetail = (campus, rank, id) => {
    // 서버에서 해당 대학정보, 참여자 정보 불러오기
    setIsVisible(true)
    setModalVisible(true)
    setCampusData({ campus, rank, id })
  }

  const [isVisible, setIsVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const _handleConfirm = useCallback(() => {
    setModalVisible(false)
  }, [])
  const [campusData, setCampusData] = useState(null)

  return (
    <ScreenName name="대학랭킹">
      <RankDetailModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        onConfirm={_handleConfirm}
        campusData={campusData}
      />
      <View style={{ flex: 1, alignItems: 'center', top: 20 }}>
        <Confetti />
        <Image
          source={require('../utils/medals.png')}
          style={{
            aspectRatio: 640 / 640,
            height: '10%',
          }}
        />
        {/* <Text style={styles.ListTitleText}>대학별 랭킹</Text> */}
        <Text
          style={{
            color: 'red',
            fontFamily: 'Cafe24Shiningstar',
            fontSize: 25,
            marginTop: 5,
          }}
        >
          대항전 종료까지 {remaining}일 남았습니다.
        </Text>

        <View style={styles.ResultContainer}>
          <ScrollView>
            <List>
              {ranks.map((result) => (
                <List.Item
                  key={result.rank}
                  style={result.name === userCampus ? styles.MyCampus : null}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      <Text style={[styles.BasicText, { fontSize: 15 }]}>
                        {result.rank}위
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      {result.rank === 1 ? (
                        <Image
                          source={require('../utils/gold_medal.png')}
                          style={{
                            aspectRatio: 184 / 369,
                            height: 30,
                          }}
                        />
                      ) : null}
                      {result.rank === 2 ? (
                        <Image
                          source={require('../utils/silver_medal.png')}
                          style={{
                            aspectRatio: 184 / 369,
                            height: 30,
                          }}
                        />
                      ) : null}
                      {result.rank === 3 ? (
                        <Image
                          source={require('../utils/bronze_medal.png')}
                          style={{
                            aspectRatio: 184 / 369,
                            height: 30,
                          }}
                        />
                      ) : null}
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 3,
                      }}
                    >
                      <Text style={[styles.BasicText, { fontSize: 15 }]}>
                        {result.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 2,
                      }}
                    >
                      <Text style={[styles.BasicText, { fontSize: 15 }]}>
                        {result.score}점
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          _handleDetail(result.name, result.rank, result.id)
                        }
                      >
                        <FontAwesomeIcon
                          name="chevron-right"
                          color="#001d40"
                          size={15}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </List.Item>
              ))}
            </List>
          </ScrollView>
        </View>

        <Text style={{ fontFamily: 'ONEMobileRegular' }}>
          대항전 기간: {startDate} ~ {endDate}
          {'\n'} 대학 순위는 실시간으로 업데이트 됩니다.
        </Text>
      </View>
    </ScreenName>
  )
}
const styles = StyleSheet.create({
  ListTitleText: {
    fontFamily: 'ONEMobileRegular',
    fontSize: 40,
  },
  Container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  BasicText: {
    fontFamily: 'ONEMobileRegular',
    paddingBottom: 0,
    fontSize: 18,
  },
  ResultContainer: {
    marginTop: 10,
    backgroundColor: '#F4F4F4',
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    height: 450,
    marginBottom: 10,
  },
  MyCampus: {
    backgroundColor: '#D1F2FF',
  },
})

export default Ranking
