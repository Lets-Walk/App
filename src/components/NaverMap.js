import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NaverMapView, { Marker } from 'react-native-nmap'
import Geolocation from 'react-native-geolocation-service'
import requestPermission from '../utils/requestPermission'
import axios from 'axios'
import { SERVER_URL } from '@env'
import GetMarkerImage from '../utils/getMarkerImage'
import getDistance from '../utils/getDistance'
import { useCallback } from 'react/cjs/react.development'
import showToast from '../utils/showToast'
import { LongPressGestureHandler } from 'react-native-gesture-handler'

const NaverMap = ({
  inventory,
  mission,
  jokerMission,
  obtainItemEmit,
  obtainJokerEmit,
}) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const [itemList, setItemList] = useState([])
  const [tempItemList, setTempItemList] = useState([])
  const [freeze, setFreeze] = useState(false)
  const [ghost, setGhost] = useState(false)

  const mapRef = useRef(null)
  const obtainMeter = 3

  const cameraChange = (location) => {
    mapRef.current.animateToCoordinate(location) //마커 좌표로 이동
  }

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

  useEffect(async () => {
    if (mission === null) {
      setItemList([])
      setTempItemList([])
      removeJoker('All')
      return
    }
    console.log('아이템 마커 생성')
    const { data } = await axios.get(SERVER_URL + '/api/map/marker', {
      params: {
        lat: location.latitude,
        lng: location.longitude,
      },
    })
    const itemList = data.data
    setItemList(itemList)
  }, [mission])

  useEffect(() => {
    const { effected, type, isEnd } = jokerMission
    if (!effected) return
    //조커 미션 제거
    if (isEnd) {
      removeJoker(type)
      return
    }
    applyJoker(type)
  }, [jokerMission])

  const obatinItem = (item) => {
    if (!mission) {
      console.log('미션이 없을 땐 아이템을 획득할 수 없음')
      return
    }
    const dist = getDistance(
      location.latitude,
      location.longitude,
      item.lat,
      item.lng,
    )

    if (dist > obtainMeter) {
      // 50m 이내의 아이템만 획득 가능.
      showToast({ type: 'errorItem' })
      console.log('거리가 너무 멀음')
      return
    }

    if (freeze) {
      showToast({ type: 'freezeItem' })
      return
    }

    const filterItemList = itemList.filter(
      (elem) => !(elem.lat === item.lat && elem.lng === item.lng),
    )
    setItemList(filterItemList)

    if (item.type === 'Joker') {
      //조커일때의 처리
      obtainJokerEmit({ item })
      return
    }
    //현재 아이템 리스트에서 획득한 아이템을 제거함.

    //아이템을 인벤토리에 추가하고 state에 반영함.
    // obtainItem.current.show('아이템을 획득했습니다.')
    console.log('아이템 획득')
    let isExist = false //아이템이 이미 인벤토리에 존재하는지 확인
    inventory.map((inv) => {
      if (inv.type === item.type) {
        inv.quantity += 1
        isExist = true
      }
    })
    let newInventory = null
    if (isExist) {
      newInventory = [...inventory]
    } else {
      newInventory = [...inventory, { type: item.type, quantity: 1 }]
    }
    obtainItemEmit({ item, newInventory })
  }

  const applyJoker = (type) => {
    console.log('applyJoker' + type)
    if (type === 'Freeze') {
      setFreeze(true)
    } else if (type === 'Hide') {
      hide()
    } else if (type === 'Ghost') {
      setGhost(true)
    }
  }

  const removeJoker = (type) => {
    console.log('removeJoker' + type)
    if (type === 'Freeze') {
      if (freeze) setFreeze(false)
    } else if (type === 'Hide') {
      unhide()
    } else if (type === 'Ghost') {
      if (ghost) setGhost(false)
    } else if (type === 'All') {
      if (ghost) setGhost(false)
      if (freeze) setFreeze(false)
      unhide()
    }
  }

  const hide = () => {
    setTempItemList(itemList)
    setItemList([])
  }

  const unhide = () => {
    setItemList(tempItemList)
    setTempItemList([])
  }

  return (
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      showsMyLocationButton={true}
      center={{ ...location, zoom: 15 }}
      ref={mapRef}
    >
      {itemList.map((item, index) => {
        const coord = { latitude: item.lat, longitude: item.lng }
        let image = null
        if (ghost) {
          image = GetMarkerImage('GhostMarker')
        } else {
          image = GetMarkerImage(item.type)
        }

        return (
          <Marker
            coordinate={coord}
            key={index}
            image={image}
            width={65}
            height={65}
            onClick={(e) => {
              obatinItem(item)
            }}
          />
        )
      })}
    </NaverMapView>
  )
}

export default React.memo(NaverMap)
