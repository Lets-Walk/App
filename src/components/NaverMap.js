import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NaverMapView, { Marker } from 'react-native-nmap'
import Geolocation from 'react-native-geolocation-service'
import requestPermission from '../utils/requestPermission'
import axios from 'axios'
import { SERVER_URL } from '@env'
import GetMarkerImage from '../utils/getMarkerImage'

const NaverMap = () => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const [itemList, setItemList] = useState([])

  const mapRef = useRef(null)

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
            // onClick={(e) => {
            //   const dist = getDistance(
            //     location.latitude,
            //     location.longitude,
            //     item.lat,
            //     item.lng,
            //   )
            //   if (dist > obtainMeter) {
            //     // 50m 이내의 아이템만 획득 가능.
            //     markerToastRef.current.show(
            //       '아이템을 획득하기에는 거리가 너무 멉니다.',
            //     )
            //   } else {
            //     const newItemList = itemList.filter(
            //       (elem) => !(elem.lat === item.lat && elem.lng === item.lng),
            //     )
            //     obtainItem.current.show('아이템을 획득했습니다.')
            //     //아이템 추가
            //     let check = false
            //     inventory.map((inv) => {
            //       if (inv.type === item.type) {
            //         inv.quantity += 1
            //         check = true
            //       }
            //     })
            //     let newList = [...inventory]
            //     if (!check) {
            //       newList = [...inventory, { type: item.type, quantity: 1 }]
            //     }
            //     setInventory(newList)
            //     setItemList(newItemList)
            //   }
            // }}
          />
        )
      })}
    </NaverMapView>
  )
}

export default React.memo(NaverMap)

const styles = StyleSheet.create({})
