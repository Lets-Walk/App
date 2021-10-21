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

import WalkingInfo from '../components/WalkingInfo'
import requestPermission from '../utils/requestPermission'
import LabInfo from '../components/LabInfo'
import { SERVER_URL } from '@env'
import WalkingTab from '../components/WalkingTab'

const Container = styled.View`
  flex: 8;
  align-items: center;
`

const WalkingMode = ({ navigation }) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const [infoVisible, setInfoVisible] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [walkingTime, setWalkingTime] = useState(130) //초기값 0으로 setting 필요
  const [steps, setSteps] = useState(1542) //초기값 0으로 setting 필요

  const toastRef = useRef()
  const ref = useRef(null)

  const showBackButtonToast = useCallback(() => {
    toastRef.current.show("'종료' 버튼을 이용하세요.")
  }, [])

  const cameraChange = (location) => {
    ref.current.animateToCoordinate(location) //마커 좌표로 이동
  }

  useEffect(async () => {
    let result = null
    try {
      result = await axios.get(SERVER_URL + '/api/map/lab', { timeout: 3000 })
      // console.log(result.data)
      setIngredient(result.data.data)
    } catch (err) {
      console.log(err)
      if (err.response) console.log(err.response.data)
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

  return (
    <>
      <Container>
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          showsMyLocationButton={true}
          center={{ ...location, zoom: 16 }}
          ref={ref}
        >
          <Marker
            coordinate={location}
            image={require('../../assets/icons/pencil.png')}
            width={65}
            height={65}
            onClick={() => {
              console.log('marker click')
              setInfoVisible(true)
              cameraChange(location)
            }}
          ></Marker>
        </NaverMapView>
        <WalkingInfo walkingTime={walkingTime} steps={steps} />
      </Container>
      <WalkingTab />
      <Modal
        backdropOpacity={0}
        onBackdropPress={() => {
          setInfoVisible(false)
        }}
        isVisible={infoVisible}
        style={{ margin: 0 }}
      >
        <LabInfo
          name="약학대학"
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
    </>
  )
}

export default WalkingMode
