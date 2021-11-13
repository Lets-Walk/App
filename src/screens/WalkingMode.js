import React, { useState, useEffect, useRef, useCallback } from 'react'
import { BackHandler, useWindowDimensions, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import Modal from 'react-native-modal'
import { ActivityIndicator } from '@ant-design/react-native'

import NaverMap from '../components/NaverMap'
import BattleInfo from '../components/BattleInfo'
import MissionTimer from '../components/MissionTimer'
import MissionInfo from '../components/MissionInfo'
import MissionBanner from '../components/MissionBanner'
import Banner from '../components/Banner'
import FinishModal from '../components/FinishModal'

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

  const toastRef = useRef()
  const markerToastRef = useRef()

  const showBackButtonToast = useCallback(() => {
    toastRef.current.show("'종료' 버튼을 이용하세요.")
  }, [])

  useEffect(() => {
    //워킹모드에서 나갈시(unmount) socket연결 끊어줌.
    return () => {
      console.log('walking mode unmount')
      socket.disconnect()
    }
  }, [])

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
    socket.on('missionCount', (count) => {
      setMissionCount(count)
    })
  }, [missionCount])

  useEffect(() => {
    socket.emit('readyWalkingMode', { battleRoomId })

    socket.on('waitingMission', ({ count }) => {
      //미션을 기다리는 중입니다. 창 필요함.
      setMissionCount(count)

      console.log('waiting Mission')
      setShowTimer(true)
    })

    socket.on('startWalkingMode', ({ mission }) => {
      setShowTimer(false)
      console.log(`미션 : ${mission}`)
      setMission(mission)
      setInfoVisible(true)
    })

    //아이템을 획득했을 때의 처리
    //크루원이 아이템을 획득한것이므로 인벤토리의 동기화가 일어나야 한다.
    socket.on('obtainItem', (data) => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    console.log('inventory : ', inventory)
  }, [inventory])

  const obatinItemEmit = useCallback(() => {
    //아이템을 획득할때 전체와 크루에게 이벤트를 발생시키는 함수
    //크루에게는 broadcast로 처리가 되어 가방 동기화가 일어나야 하고
    //전체에게는 io.emit 으로 처리가 되어 획득 로그가 출력되어야 한다.
    //Inventory데이터를 전달하는 식으로 처리해야 할듯 (비동기로 인해 값이 제대로 안들어갈시 변경 필요)
    //클라이언트에는 아이템 획들을 on하는 함수도 추가되어야함.
    console.log('앱에서 유저가 emit을 함.')
    socket.emit('obtainItem', { battleRoomId, crewId, userInfo, inventory })
  }, [userInfo, crewId, battleRoomId, inventory])

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
          setInventory={setInventory}
          obatinItemEmit={obatinItemEmit}
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
      <Toast
        ref={toastRef}
        positionValue={useWindowDimensions().height * 0.12}
        fadeInDuration={300}
        fadeOutDuration={2000}
        style={{ borderRadius: 15, backgroundColor: 'rgba(47, 56, 66, 0.8)' }}
      />
      <Toast
        ref={markerToastRef}
        positionValue={useWindowDimensions().height * 0.98}
        fadeInDuration={300}
        fadeOutDuration={2000}
        style={{ borderRadius: 15, backgroundColor: 'rgba(47, 56, 66, 0.8)' }}
      />
      {/* <Toast
        ref={obtainItem}
        positionValue={useWindowDimensions().height * 0.98}
        fadeInDuration={300}
        fadeOutDuration={1500}
        style={{ borderRadius: 15, backgroundColor: 'rgba(37, 81, 125, 0.8)' }}
      /> */}
    </>
  )
}

export default WalkingMode

const styles = StyleSheet.create({})
