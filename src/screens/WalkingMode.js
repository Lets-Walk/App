import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Pressable,
  Text,
  BackHandler,
  useWindowDimensions,
  Animated,
} from 'react-native'
import styled from 'styled-components/native'
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap'
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import Modal from 'react-native-modal'
import { ActivityIndicator } from '@ant-design/react-native'

import WalkingInfo from '../components/WalkingInfo'
import requestPermission from '../utils/requestPermission'
import LabInfo from '../components/LabInfo'
import { SERVER_URL } from '@env'
import WalkingTab from '../components/WalkingTab'
import ImageComponent from '../components/ImageComponent'
import getDistance from '../utils/getDistance'

const Container = styled.View`
  flex: 8;
  align-items: center;
`

const WalkingMode = ({ route, navigation }) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const { socket, battleRoomId } = route.params
  const [location, setLocation] = useState(initialLocation)
  const [infoVisible, setInfoVisible] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(true)
  const [walkingTime, setWalkingTime] = useState(130) //초기값 0으로 setting 필요
  const [steps, setSteps] = useState(1542) //초기값 0으로 setting 필요
  const [labName, setLabName] = useState('')
  const [inventory, setInventory] = useState([])
  const [missionCount, setMissionCount] = useState(null)

  const toastRef = useRef()
  const markerToastRef = useRef()
  const obtainItem = useRef()
  const ref = useRef(null)
  const obtainMeter = 0.05 // 아이템 획득하기 위한 거리 0.1 = 100m

  const showBackButtonToast = useCallback(() => {
    toastRef.current.show("'종료' 버튼을 이용하세요.")
  }, [])

  const cameraChange = (location) => {
    ref.current.animateToCoordinate(location) //마커 좌표로 이동
  }

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
        // navigation.navigate('Home')
        showBackButtonToast()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, []),
  )

  useEffect(async () => {
    const result = await requestPermission()
    console.log(result)
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
    socket.on('missonCount', (count) => {
      setMissionCount(count)
    })
  }, [missionCount])

  useEffect(() => {
    socket.emit('readyWalkingMode', { battleRoomId })

    socket.on('waitingMission', ({ count }) => {
      //미션을 기다리는 중입니다. 창 필요함.
      setMissionCount(count)

      console.log('waiting Mission')
    })
  }, [])

  // useEffect(async () => {
  //   if (location === initialLocation) return
  //   const { data } = await axios.get(SERVER_URL + '/api/map/marker', {
  //     params: {
  //       lat: location.latitude,
  //       lng: location.longitude,
  //     },
  //   })
  //   const itemList = data.data
  //   setItemList(itemList)
  //   setLoading(false)
  // }, [location])

  return (
    <>
      <Container>
        {/* <ActivityIndicator
          animating={loading}
          toast
          text="Loading..."
          size="large"
        /> */}
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          showsMyLocationButton={true}
          center={{ ...location, zoom: 16 }}
          ref={ref}
        >
          {itemList.map((item, index) => {
            const coord = { latitude: item.lat, longitude: item.lng }
            return (
              <Marker
                coordinate={coord}
                key={index}
                image={ImageComponent(item.type)}
                width={65}
                height={65}
                onClick={(e) => {
                  const dist = getDistance(
                    location.latitude,
                    location.longitude,
                    item.lat,
                    item.lng,
                  )
                  if (dist > obtainMeter) {
                    // 50m 이내의 아이템만 획득 가능.
                    markerToastRef.current.show(
                      '아이템을 획득하기에는 거리가 너무 멉니다.',
                    )
                  } else {
                    const newItemList = itemList.filter(
                      (elem) =>
                        !(elem.lat === item.lat && elem.lng === item.lng),
                    )
                    obtainItem.current.show('아이템을 획득했습니다.')
                    //아이템 추가
                    let check = false
                    inventory.map((inv) => {
                      if (inv.type === item.type) {
                        inv.quantity += 1
                        check = true
                      }
                    })
                    let newList = [...inventory]
                    if (!check) {
                      newList = [...inventory, { type: item.type, quantity: 1 }]
                    }
                    setInventory(newList)
                    setItemList(newItemList)
                  }
                }}
              />
            )
          })}
        </NaverMapView>
        <WalkingInfo walkingTime={walkingTime} steps={missionCount} />
      </Container>
      {/* <WalkingTab inventory={inventory} /> */}
      <Modal
        backdropOpacity={0}
        onBackdropPress={() => {
          setInfoVisible(false)
        }}
        isVisible={infoVisible}
        style={{ margin: 0 }}
      >
        <LabInfo
          name={labName}
          ingredient={ingredient}
          setVisible={setInfoVisible}
        />
      </Modal>
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
      <Toast
        ref={obtainItem}
        positionValue={useWindowDimensions().height * 0.98}
        fadeInDuration={300}
        fadeOutDuration={1500}
        style={{ borderRadius: 15, backgroundColor: 'rgba(37, 81, 125, 0.8)' }}
      />
    </>
  )
}

export default WalkingMode
