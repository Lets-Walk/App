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

const NaverMap = ({ inventory, mission, obtainItemEmit }) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const [itemList, setItemList] = useState([])

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
    if (location === initialLocation) return
    const { data } = await axios.get(SERVER_URL + '/api/map/marker', {
      params: {
        lat: location.latitude,
        lng: location.longitude,
      },
    })
    const itemList = data.data
    setItemList(itemList)
  }, [location])

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
      // markerToastRef.current.show(
      //   '아이템을 획득하기에는 거리가 너무 멉니다.',
      // )
      console.log('거리가 너무 멀음')
    } else {
      //현재 아이템 리스트에서 획득한 아이템을 제거함.
      const filterItemList = itemList.filter(
        (elem) => !(elem.lat === item.lat && elem.lng === item.lng),
      )

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
      setItemList(filterItemList)
      obtainItemEmit({ item, newInventory })
    }
  }

  return (
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      showsMyLocationButton={true}
      center={{ ...location, zoom: 16 }}
      ref={mapRef}
    >
      {itemList.map((item, index) => {
        const coord = { latitude: item.lat, longitude: item.lng }
        return (
          <Marker
            coordinate={coord}
            key={index}
            image={GetMarkerImage(item.type)}
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
