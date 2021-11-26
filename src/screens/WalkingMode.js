import React, { useState, useEffect, useCallback } from 'react'
import {
  BackHandler,
  useWindowDimensions,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native'
import styled from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from '@ant-design/react-native'
import Geolocation from 'react-native-geolocation-service'
import axios from 'axios'

import requestPermission from '../utils/requestPermission'
import NaverMap from '../components/NaverMap'
import BattleInfo from '../components/BattleInfo'
import MissionTimer from '../components/MissionTimer'
import MissionInfo from '../components/MissionInfo'
import MissionBanner from '../components/MissionBanner'
import Banner from '../components/Banner'
import FinishModal from '../components/FinishModal'
import MissionSuccess from '../components/MissionSuccess'
import showToast from '../utils/showToast'
import Inventory from '../components/Inventory'
import { SERVER_URL } from '@env'
import JokerWait from '../components/JokerWait'
import JokerMission from '../components/JokerMission'
import JokerTimer from '../components/JokerTimer'
import FinishMode from '../components/FinishMode'
import Chat from '../components/Chat'

const Container = styled.View`
  flex: 1;
  align-items: center;
`

const WalkingMode = ({ route, navigation }) => {
  const { socket, battleRoomId, userInfo, crewId } = route.params
  const { isProgress, p_crewInfo, p_mission, p_inventory, p_items } =
    route.params
  const [infoVisible, setInfoVisible] = useState(false) //미션정보 모달
  const [loading, setLoading] = useState(true)
  const [inventory, setInventory] = useState([])
  const [location, setLocation] = useState(null)
  const [itemList, setItemList] = useState([])
  const [invAnimation, setAnimValue] = useState(new Animated.Value(0))
  const [chatAnimation, setChatAnimation] = useState(new Animated.Value(0))
  const [invBadge, setInvBadge] = useState(false)
  const [missionCount, setMissionCount] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showFinishModal, setFinishModal] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatBadge, setChatBadge] = useState(false)
  const [mission, setMission] = useState(null)
  const [crewInfo, setCrewInfo] = useState(route.params.crewInfo)
  const [successMission, setSuccessMission] = useState({
    winCampus: null,
    modalVisible: false,
  })
  const [jokerWait, setJokerWait] = useState(false)
  const [showJokerTimer, setShowJokerTimer] = useState(false)
  const [jokerTimerCount, setJokerTimerCount] = useState(0)
  const [showJokerMission, setShowJokerMission] = useState(false)
  const [jokerMission, setJokerMission] = useState({
    effected: false,
    type: null,
    isEnd: false,
  })
  const [finishMode, setFinishMode] = useState({
    winCampus: null,
    modalVisible: false,
  })

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setFinishModal(true)
        return true
      }
      const backEvent = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      )
      return () => backEvent.remove()
    }, []),
  )

  useEffect(async () => {
    const result = await requestPermission()
    if (result === 'granted') {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        },
        (error) => {
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }
  }, [])

  useEffect(() => {
    console.log('walking mode useEffect')
    if (isProgress) {
      reconnectWalkingMode()
    } else {
      emitReadyWalkingMode()
    }

    //이 부분 로그 여러개뜨는거 확인해보기.
    socket.on('waitingMission', ({ count }) => {
      //미션을 기다리는 중입니다. 창 필요함.
      setMissionCount(count)

      console.log('waiting Mission')
      setShowTimer(true)
    })

    socket.on('missionCount', (count) => {
      setMissionCount(count)
    })

    socket.on('obtainItem', ({ userInfo, item }) => {
      const { nickname } = userInfo
      const campusLogoUrl =
        SERVER_URL + '/static/logos/' + userInfo.campus.image
      // Alert.alert(`${nickname}이 ${item.type}을 획득했습니다.`)
      showToast({
        type: 'obtainItem',
        logo: campusLogoUrl,
        userName: nickname,
        item: item.type,
      })
    })

    socket.on(
      'jokerMission',
      ({ type, seconds, obtainCampus, effectedCampus }) => {
        setJokerWait(false)
        //조커 미션을 설명하는 모달 창 띄움 (campusName에 따라 렌더링 다르게 필요)
        console.log(type, obtainCampus, effectedCampus)
        let effected = false
        if (userInfo.campus.name === effectedCampus) {
          //조커 미션을 당하는 크루라면
          //타입에 따른 조커 미션 적용
          //조커 미션 타이머 띄움
          setShowJokerTimer(true)
          setJokerTimerCount(seconds)
          effected = true
        }

        //조커 모달 띄움 obtainCampus와 effectedCampus 전달해서 렌더링 다르게 하기.
        setJokerMission({
          effected: effected,
          type: type,
          isEnd: false,
        })
        setShowJokerMission(true)
      },
    )

    socket.on('jokerMissionCount', ({ count }) => {
      setJokerTimerCount(count)
    })

    socket.on('jokerMissionEnd', ({ type, effectedCampus }) => {
      //조커 모달, 조커 효과, 타이머 제거 (함수화로 빼서, 미션 성공했을 때도 사용하기)
      console.log('jokerMission End')
      const effected = userInfo.campus.name === effectedCampus

      if (effected) {
        setJokerTimerCount(0)
        setShowJokerTimer(false)
      }

      setJokerMission({
        effected: effected,
        type: type,
        isEnd: true,
      })
      setShowJokerMission(false)
    })

    //워킹모드 unmount시 socket 연결 끊음
    return () => {
      console.log('walking mode unmount')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('startWalkingMode', async ({ mission }) => {
      setShowTimer(false)
      console.log(`미션 : ${mission}`)
      setMission(mission)
      setInfoVisible(true)
      //아이템 마커 그리기
      const items = await createItems(location)
      setItemList(items)
      sendItemsEmit(items)
    })

    return () => {
      socket.removeAllListeners('startWalkingMode')
    }
  }, [location])

  useEffect(() => {
    socket.on('missionSuccess', ({ crewInfo, mission, campusName, isEnd }) => {
      console.log('missionSuccess')
      setCrewInfo(crewInfo) //LIFE 깎기,
      setMission(null) //미션 초기화

      console.log('inventory초기화')
      setInventory([])
      setInvBadge(false)

      //아이템 초기화
      setItemList([])
      sendItemsEmit([])

      setShowJokerTimer(false)
      setJokerTimerCount(0)
      setJokerMission({ ...jokerMission, isEnd: true })

      //맵의 마커를 초기화 하는 작업 필요.
      //isEnd면 더 이상 진행하지 않고 return
      if (isEnd) {
        //setFinishMode 설정
        setFinishMode({
          winCampus: campusName,
          modalVisible: true,
        })
        return
      }
      //미션완료 팝업 후 잠깐 대기한 다음 다음 미션에 대한 준비완료를 알림
      setSuccessMission({
        winCampus: campusName,
        modalVisible: true,
      })
      setTimeout(() => {
        emitReadyWalkingMode()
      }, 3000)
    })

    return () => {
      socket.removeAllListeners('missionSuccess')
    }
  }, [jokerMission])

  useEffect(() => {
    socket.on('receiveChat', ({ messages }) => {
      if (!showChat) setChatBadge(true)
      setChatMessages(messages)
    })

    return () => {
      socket.removeAllListeners('receiveChat')
    }
  }, [showChat])

  useEffect(() => {
    socket.on('inventorySync', ({ newInventory }) => {
      if (!showInventory) setInvBadge(true)
      setInventory(newInventory)
    })

    return () => {
      socket.removeAllListeners('inventorySync')
    }
  }, [showInventory])

  const emitReadyWalkingMode = useCallback(() => {
    socket.emit('readyWalkingMode', { battleRoomId })
  }, [battleRoomId])

  const reconnectWalkingMode = useCallback(() => {
    setMission(p_mission)
    setCrewInfo(p_crewInfo)
    setItemList(p_items)
    if (p_inventory) setInventory(p_inventory)
    else setInventory([])
  }, [])

  const obtainItemEmit = useCallback(
    ({ item, newInventory }) => {
      //아이템을 획득할때 전체와 크루에게 이벤트를 발생시키는 함수
      //크루에게는 broadcast로 처리가 되어 가방 동기화가 일어나야 하고
      //전체에게는 io.emit 으로 처리가 되어 획득 로그가 출력되어야 한다.
      //Inventory데이터를 전달하는 식으로 처리해야 할듯 (비동기로 인해 값이 제대로 안들어갈시 변경 필요)
      //클라이언트에는 아이템 획들을 on하는 함수도 추가되어야함.
      console.log('obtainItemEmit')
      socket.emit('inventorySync', { crewId, battleRoomId, newInventory })
      socket.emit('obtainItem', { battleRoomId, userInfo, item })
      socket.emit('missionValidation', {
        newInventory,
        battleRoomId,
        crewInfo,
        crewId,
        campusName: userInfo.campus.name,
      })
    },
    [crewInfo],
  )

  const obtainJokerEmit = useCallback(
    ({ item }) => {
      console.log('jokerItemEmit')
      socket.emit('jokerGain', {
        crewId,
        battleRoomId,
        crewInfo,
        campusName: userInfo.campus.name,
      })
      socket.emit('obtainItem', { battleRoomId, userInfo, item })

      //조커 미션을 기다리는 모달 창 켜기
      setJokerWait(true)
    },
    [crewInfo],
  )

  const missionBannerToggle = () => {
    if (mission) setInfoVisible(!infoVisible)
  }

  const jokerMissionToggle = useCallback(() => {
    console.log('jokerMissionToggle')
    setShowJokerMission(!showJokerMission)
  }, [jokerMission])

  const toggleFinishModal = useCallback(() => {
    setFinishModal(!showFinishModal)
  }, [showFinishModal])

  const toggleInventory = useCallback(() => {
    setShowChat(false)
    setInvBadge(false)
    if (showInventory) {
      setShowInventory(false)
      setAnimValue(new Animated.Value(0))
    } else {
      setShowInventory(true)
      Animated.timing(invAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [showInventory])

  const toggleChat = useCallback(() => {
    setShowInventory(false)
    setChatBadge(false)
    if (showChat) {
      setShowChat(false)
      setChatAnimation(new Animated.Value(0))
    } else {
      setShowChat(true)
      Animated.timing(chatAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [showChat])

  const sendMessageEmit = useCallback((messages) => {
    console.log('send Chat Emit')
    socket.emit('sendChat', { messages, crewId, battleRoomId })
  }, [])

  const sendItemsEmit = useCallback((items) => {
    socket.emit('sendItems', {
      battleRoomId,
      crewId,
      items,
      userId: userInfo.id,
    })
  }, [])

  const createItems = useCallback(
    async (location) => {
      const { data } = await axios.get(SERVER_URL + '/api/map/marker', {
        params: {
          lat: location.latitude,
          lng: location.longitude,
        },
      })

      const itemList = data.data

      return itemList
    },
    [location],
  )

  return (
    <>
      <Container>
        {/* <ActivityIndicator
          animating={loading}
          toast
          text="Loading..."
          size="large"
        /> */}
        <NaverMap
          inventory={inventory}
          mission={mission}
          jokerMission={jokerMission}
          obtainItemEmit={obtainItemEmit}
          obtainJokerEmit={obtainJokerEmit}
          sendItemsEmit={sendItemsEmit}
          itemList={itemList}
          setItemList={setItemList}
          location={location}
        />
        <BattleInfo userInfo={userInfo} crewInfo={crewInfo} />
        <MissionSuccess
          successMission={successMission}
          setSuccessMission={setSuccessMission}
        />
        <FinishMode finishMode={finishMode} setFinishMode={setFinishMode} />
        <MissionTimer show={showTimer} count={missionCount} />
        <MissionBanner missionBannerToggle={missionBannerToggle} />
        <JokerWait modalVisible={jokerWait} />
        <JokerMission
          jokerMission={jokerMission}
          setJokerMission={setJokerMission}
          showJokerMission={showJokerMission}
          setShowJokerMission={setShowJokerMission}
        />
        <JokerTimer
          jokerMissionToggle={jokerMissionToggle}
          showJokerTimer={showJokerTimer}
          jokerTimerCount={jokerTimerCount}
        />
        <Banner
          toggleInventory={toggleInventory}
          invBadge={invBadge}
          chatBadge={chatBadge}
          toggleChat={toggleChat}
        />
        <MissionInfo
          name={mission}
          infoVisible={infoVisible}
          setInfoVisible={setInfoVisible}
        />
        <Inventory
          inventory={inventory}
          showInventory={showInventory}
          toggleInventory={toggleInventory}
          invAnimation={invAnimation}
        />
        <Chat
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          showChat={showChat}
          toggleChat={toggleChat}
          chatAnimation={chatAnimation}
          sendMessageEmit={sendMessageEmit}
          userInfo={userInfo}
        />
        <FinishModal
          modalVisible={showFinishModal}
          toggleModal={toggleFinishModal}
        />
      </Container>
      {/* <WalkingTab inventory={inventory} /> */}
    </>
  )
}

export default WalkingMode

const styles = StyleSheet.create({})
