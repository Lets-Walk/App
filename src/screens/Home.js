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
import { List } from '@ant-design/react-native'
import HomeResultModal from '../components/HomeResultModal'
import { SERVER_URL } from '@env'
import { Crown, Footprint } from '../../assets/icons'
import { io } from 'socket.io-client'

const Home = ({ user, navigation }) => {
  const name = user.name // 사용자 이름
  const campus = user.Campus.name // 소속 대학명
  const userEmail = user.email // 사용자 이메일
  const nickname = user.nickname // 사용자 닉네임
  const battleRoomId = user.battleRoomId

  const profileUrl = SERVER_URL + '/static/profiles/' + user.profileUrl
  const campusLogoUrl = SERVER_URL + '/static/logos/' + user.Campus.image

  const [socket, setSocket] = useState(null)
  const [stepCount, setStepCount] = useState(user.Walk.stepcount)
  const [winNum, setWinNum] = useState(user.Walk.wincount)
  const [loseNum, setLoseNum] = useState(user.Walk.losecount)
  const winningRate = parseFloat((winNum / (winNum + loseNum)) * 100).toFixed(2) // 승률

  const [results, setResults] = useState([
    // {
    //   no: 1,
    //   date: '21.12.26',
    //   startTime: '10:23',
    //   endTime: '10:55',
    //   outcome: 'win',
    //   opponent: '숭실대학교',
    //   steps: 328,
    //   members: ['kim', 'lee', 'jason'],
    // },
    // {
    //   no: 2,
    //   date: '21.12.28',
    //   startTime: '09:11',
    //   endTime: '09:42',
    //   outcome: 'win',
    //   opponent: '서울대학교',
    //   steps: 277,
    //   members: ['park', 'yoon', 'kevin'],
    // },
    // {
    //   no: 3,
    //   date: '21.12.28',
    //   startTime: '14:48',
    //   endTime: '15:01',
    //   outcome: 'lose',
    //   opponent: '건국대학교',
    //   steps: 302,
    //   members: ['park', 'kim2', 'john'],
    // },
    // {
    //   no: 4,
    //   date: '21.12.29',
    //   startTime: '11:11',
    //   endTime: '11:35',
    //   outcome: 'lose',
    //   opponent: '가야대학교',
    //   steps: 411,
    //   members: ['jang', 'harry', 'choi'],
    // },
    // {
    //   no: 5,
    //   date: '21.12.30',
    //   startTime: '17:55',
    //   endTime: '18:05',
    //   outcome: 'win',
    //   opponent: '연세대학교',
    //   steps: 194,
    //   members: ['yoon', 'kim', 'john'],
    // },
    // {
    //   no: 6,
    //   date: '21.12.31',
    //   startTime: '12:55',
    //   endTime: '15:05',
    //   outcome: 'win',
    //   opponent: '연세대학교',
    //   steps: 194,
    //   members: ['yoon', 'kim', 'john'],
    // },
    // {
    //   no: 7,
    //   date: '21.12.31',
    //   startTime: '15:55',
    //   endTime: '20:05',
    //   outcome: 'lose',
    //   opponent: '연세대학교',
    //   steps: 194,
    //   members: ['yoon', 'kim', 'john'],
    // },
  ]) // mockup data
  const [modalVisible, setModalVisible] = useState(false)
  const [modalNum, setModalNum] = useState(0)

  const _handleSee = (num) => {
    setModalNum(num - 1)
    setModalVisible(true)
  }

  const _handleConfirm = useCallback(() => {
    setModalVisible(false)
  }, [])

  useEffect(() => {
    if (battleRoomId && !socket) {
      setSocket(io.connect(SERVER_URL))
      return
    }

    socket.emit('reconnect', { battleRoomId })
    socket.on('reconnect', (currentBattle) => {
      const myCrew = currentBattle.crewInfo.find(
        (crew) => crew.campus.name === campus,
      )
      console.log(myCrew)
      // navigation.navigate('WalkingMode', {
      //   socket: socket,
      //   battleRoomId: battleRoomId,
      //   crewInfo: currentBattle.crewInfo,
      //   userInfo: user,
      //   crewId: myCrew.roomId,
      //   mission: currentBattle.mission,
      // })
    })
  }, [socket])

  useEffect(() => {
    console.log('home render')

    //여기서 배틀룸 아이디 갱신하기
  }, [])

  return (
    <ScreenName name="홈">
      <HomeResultModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        date={results[modalNum]?.date}
        startTime={results[modalNum]?.startTime}
        endTime={results[modalNum]?.endTime}
        opponent={results[modalNum]?.opponent}
        outcome={results[modalNum]?.outcome}
        steps={results[modalNum]?.steps}
        members={results[modalNum]?.members}
        onConfirm={_handleConfirm}
      />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 22,
          marginTop: 12,
          fontFamily: 'ONEMobileBold',
        }}
      >
        {name}님, 안녕하세요!
      </Text>
      <View
        style={{
          marginRight: 22,
          marginTop: 2,
          marginBottom: 0,
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: 'OneMobileRegular',
            fontSize: 14,
            color: 'gray',
          }}
        >
          당신의 건강한 내일을 응원합니다.
        </Text>
      </View>

      <View style={styles.Container}>
        <View
          style={[
            styles.UserInfoContainer,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: profileUrl }}
              style={styles.ProfileContainer}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContnet: 'space-between',
                marginLeft: 10,
              }}
            >
              <Text style={styles.UserInfoText}>{nickname}</Text>
              <Text
                style={[
                  styles.UserInfoText,
                  { fontSize: 15, marginTop: 3, fontStyle: 'italic' },
                ]}
              >
                {userEmail}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginRight: 20,
            }}
          >
            <Image
              source={{ uri: campusLogoUrl }}
              style={styles.LogoContainer}
            />
            <Text
              style={[styles.UserInfoText, { fontSize: 12, paddingTop: 5 }]}
            >
              {campus}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ backgroundColor: '#ffffff' }, styles.CountContainer]}>
            <View style={{ flexDirection: 'row' }}>
              {/* <FontAwesomeIcon name="shoe-prints" color="#001d40" size={15} /> */}
              <Image
                source={Footprint}
                style={{ width: 20, height: 20, bottom: 2 }}
              />
              <Text style={[styles.BasicText, { fontFamily: 'ONEMobileBold' }]}>
                {'\t'}나의 걸음 수{'\n'}
              </Text>
            </View>
            <Text style={[styles.BasicText, { flexDirection: 'row' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {stepCount}{' '}
              </Text>
              <Text>걸음</Text>
            </Text>
          </View>

          <View style={[{ backgroundColor: '#ffffff' }, styles.CountContainer]}>
            <View style={{ flexDirection: 'row' }}>
              {/* <FontAwesomeIcon name="crown" color="#001d40" size={15} /> */}
              <Image
                source={Crown}
                style={{ width: 20, height: 20, bottom: 3 }}
              />
              <Text style={[styles.BasicText, { fontFamily: 'ONEMobileBold' }]}>
                {'\t'}나의 전적
              </Text>
            </View>
            <Text
              style={[
                styles.BasicText,
                { paddingTop: 7, paddingBottom: 3, fontSize: 20 },
              ]}
            >
              {winNum}승 {loseNum}패
            </Text>
            <Text style={[styles.BasicText, { fontSize: 14 }]}>
              (승률: {winningRate}%)
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.BasicText,
            { marginLeft: 22, marginTop: 30, fontFamily: 'ONEMobileRegular' },
          ]}
        >
          지난 배틀 결과
        </Text>
        <View style={styles.ResultContainer}>
          <ScrollView>
            <List>
              {results.map((result) => (
                <List.Item key={result.no}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 5,
                    }}
                  >
                    <Text style={[styles.BasicText, { fontSize: 15 }]}>
                      {result.date} ({result.startTime} ~ {result.endTime})
                    </Text>
                    {result.outcome == 'win' ? (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#BB0808',
                          backgroundColor: '#BB0808',
                        }}
                      >
                        <Text
                          style={[
                            styles.BasicText,
                            { fontSize: 15, color: 'white' },
                          ]}
                        >
                          승
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#00248B',
                          backgroundColor: '#00248B',
                        }}
                      >
                        <Text
                          style={[
                            styles.BasicText,
                            { fontSize: 15, color: 'blue', color: 'white' },
                          ]}
                        >
                          패
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity onPress={() => _handleSee(result.no)}>
                      <FontAwesomeIcon
                        name="search"
                        color="#001d40"
                        size={15}
                      />
                    </TouchableOpacity>
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
  Container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  UserInfoContainer: {
    marginTop: 7,
    marginLeft: 20,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    height: 120,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  UserInfoText: {
    fontSize: 20,
    fontFamily: 'ONEMobileRegular',
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
    marginTop: 8,
    marginLeft: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 500,
  },
})

export default Home
