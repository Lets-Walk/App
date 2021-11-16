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

const Ranking = ({ user }) => {
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
  ]) // mockup data

  return (
    <ScreenName name="대학랭킹">
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Confetti />
        <Image
          source={require('../utils/medals.png')}
          style={{
            aspectRatio: 640 / 640,
            height: '10%',
          }}
        />
        <Text style={styles.ListTitleText}>대학별 랭킹</Text>

        <View style={styles.ResultContainer}>
          <ScrollView>
            <List>
              {ranks.map((result) => (
                <List.Item key={result.rank}>
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
                      <TouchableOpacity>
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
      </View>
    </ScreenName>
  )
}
const styles = StyleSheet.create({
  ListTitleText: {
    fontFamily: 'Cafe24Shiningstar',
    fontSize: 40,
  },
  Container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  CountContainer: {
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    height: 120,
    width: (Dimensions.get('window').width - 40) / 2 - 10,
    height: 120,
    borderRadius: 10,
  },
  BasicText: {
    fontFamily: 'ONEMobileRegular',
    paddingBottom: 0,
    fontSize: 18,
  },
  ProfileContainer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  LogoContainer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  ResultContainer: {
    marginTop: 10,
    backgroundColor: '#F4F4F4',
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    height: 300,
  },
})

export default Ranking
