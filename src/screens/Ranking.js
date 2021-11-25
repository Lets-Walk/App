import React, { useState, useCallback } from 'react'
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
import { List } from '@ant-design/react-native'
import Confetti from '../animations/Confetti'
import RankDetailModal from '../components/RankDetailModal'

const Ranking = ({ user }) => {
  const startDate = '2021.12.01'
  const endDate = '2021.12.31'
  const userCampus = user.Campus.name
  const [ranks, setRanks] = useState([
    {
      rank: 1,
      campus: '중앙대학교',
      score: 1820,
    },
    {
      rank: 2,
      campus: '숭실대학교',
      score: 1610,
    },
    {
      rank: 3,
      campus: '서울대학교',
      score: 1500,
    },
    {
      rank: 4,
      campus: '연세대학교',
      score: 1480,
    },
    {
      rank: 5,
      campus: '건국대학교',
      score: 1120,
    },
    {
      rank: 6,
      campus: '고려대학교',
      score: 1090,
    },
    {
      rank: 7,
      campus: '동국대학교',
      score: 870,
    },
    {
      rank: 8,
      campus: '서강대학교',
      score: 850,
    },
    {
      rank: 9,
      campus: '한양대학교',
      score: 790,
    },
    {
      rank: 10,
      campus: '홍익대학교',
      score: 750,
    },
    {
      rank: 11,
      campus: '광운대학교',
      score: 660,
    },
  ]) // mockup data

  const _handleDetail = (campus, rank) => {
    // 서버에서 해당 대학정보, 참여자 정보 불러오기
    setIsVisible(true)
    setModalVisible(true)
    setCampusName(campus)
    setCampusRank(rank)
  }

  const [isVisible, setIsVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const _handleConfirm = useCallback(() => {
    setModalVisible(false)
  }, [])
  const [campusName, setCampusName] = useState('')
  const [campusRank, setCampusRank] = useState(0)

  return (
    <ScreenName name="대학랭킹">
      <RankDetailModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        onConfirm={_handleConfirm}
        campusName={campusName}
        campusRank={campusRank}
      />
      <View style={{ flex: 1, alignItems: 'center', top: 30 }}>
        <Confetti />
        <Image
          source={require('../utils/medals.png')}
          style={{
            aspectRatio: 640 / 640,
            height: '10%',
          }}
        />
        {/* <Text style={styles.ListTitleText}>대학별 랭킹</Text> */}

        <View style={styles.ResultContainer}>
          <ScrollView>
            <List>
              {ranks.map((result) => (
                <List.Item
                  key={result.rank}
                  style={result.campus === userCampus ? styles.MyCampus : null}
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
                        {result.campus}
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
                          _handleDetail(result.campus, result.rank)
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
