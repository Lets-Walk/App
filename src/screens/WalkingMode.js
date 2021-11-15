import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  BackHandler,
  useWindowDimensions,
  StyleSheet,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native'
import Modal from 'react-native-modal'
import { ActivityIndicator } from '@ant-design/react-native'

import NaverMap from '../components/NaverMap'
import BattleInfo from '../components/BattleInfo'
import MissionTimer from '../components/MissionTimer'
import MissionInfo from '../components/MissionInfo'
import MissionBanner from '../components/MissionBanner'
import Banner from '../components/Banner'
import FinishModal from '../components/FinishModal'
import showToast from '../utils/showToast'
import { SERVER_URL } from '@env'

const Container = styled.View`
  flex: 1;
  align-items: center;
`

const WalkingMode = ({ route, navigation }) => {
  const { socket, battleRoomId, userInfo, crewId } = route.params
  const [infoVisible, setInfoVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [inventory, setInventory] = useState([])
  const [missionCount, setMissionCount] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showFinishModal, setFinishModal] = useState(false)
  const [mission, setMission] = useState(null)
  const [crewInfo, setCrewInfo] = useState(route.params.crewInfo)

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

  useEffect(() => {
    console.log('walking mode useEffect')
    emitReadyWalkingMode()

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

    //이부분 로그 여러개뜨는거 확인해보기.
    socket.on('startWalkingMode', ({ mission }) => {
      setShowTimer(false)
      console.log(`미션 : ${mission}`)
      setMission(mission)
      setInfoVisible(true)
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

    socket.on('inventorySync', ({ newInventory }) => {
      console.log('inventorySync')
      setInventory(newInventory)
    })

    socket.on('missionSuccess', ({ crewInfo, mission, campusName, isEnd }) => {
      console.log('missionSuccess')
      setCrewInfo(crewInfo)
      setMission(null) //미션 초기화
      console.log('inventory초기화')
      setInventory([])
      //맵의 마커를 초기화 하는 작업 필요.
      Alert.alert(`${campusName}크루가 ${mission}미션을 완료했습니다.`)
      if (isEnd) return //isEnd면 더 이상 진행하지 않고 return
      //미션완료 팝업 후 잠깐 대기한 다음 다음 미션에 대한 준비완료를 알림
      setTimeout(() => {
        emitReadyWalkingMode()
      }, 3000)
    })

    //워킹모드 unmount시 socket 연결 끊음
    return () => {
      console.log('walking mode unmount')
      socket.disconnect()
    }
  }, [])

  const emitReadyWalkingMode = useCallback(() => {
    socket.emit('readyWalkingMode', { battleRoomId })
  }, [battleRoomId])

  const obtainItemEmit = useCallback(
    ({ item, newInventory }) => {
      //아이템을 획득할때 전체와 크루에게 이벤트를 발생시키는 함수
      //크루에게는 broadcast로 처리가 되어 가방 동기화가 일어나야 하고
      //전체에게는 io.emit 으로 처리가 되어 획득 로그가 출력되어야 한다.
      //Inventory데이터를 전달하는 식으로 처리해야 할듯 (비동기로 인해 값이 제대로 안들어갈시 변경 필요)
      //클라이언트에는 아이템 획들을 on하는 함수도 추가되어야함.
      console.log('obtainItemEmit')
      socket.emit('inventorySync', { crewId, newInventory })
      socket.emit('obtainItem', { battleRoomId, userInfo, item })
      socket.emit('missionValidation', {
        mission,
        newInventory,
        battleRoomId,
        crewInfo,
        campusName: userInfo.campus.name,
      })
    },
    [crewInfo, mission],
  )

  const missionBannerToggle = () => {
    if (mission) setInfoVisible(!infoVisible)
  }

  const toggleFinishModal = useCallback(() => {
    setFinishModal(!showFinishModal)
  }, [showFinishModal])

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
          obtainItemEmit={obtainItemEmit}
        />
        <BattleInfo userInfo={userInfo} crewInfo={crewInfo} />
        <MissionTimer show={showTimer} count={missionCount} />
        <MissionBanner missionBannerToggle={missionBannerToggle} />
        <Banner inventory={inventory} />
        <Modal
          backdropOpacity={0}
          onBackdropPress={() => {
            setInfoVisible(false)
          }}
          isVisible={infoVisible}
          style={{ margin: 0 }}
        >
          <MissionInfo name={mission} setVisible={setInfoVisible} />
        </Modal>
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
