import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacit,
  Pressable,
  BackHandler,
  useWindowDimensions,
} from 'react-native'
import styled from 'styled-components/native'
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap'
import Geolocation from 'react-native-geolocation-service'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import requestPermission from '../utils/requestPermission'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  justify-content: space-around;
  padding: 5px;
  margin: 0px 0px;
`

const InfoContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 17%;
  width: 40%;
  background-color: #ffffff;
  padding: 3px 5px;
  border-radius: 10px;
  justify-content: space-around;
  border-width: 1px;
  border-color: #4495d0;
`

const Container = styled.View`
  flex: 8;
  align-items: center;
`

const WalkingInfoText = styled.Text`
  font-size: 23px;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  font-family: BMHANNAAir_ttf;
`

const ButtonText = styled.Text`
  font-size: 12px;
  align-items: center;

  font-family: BMHANNAAir_ttf;
  padding: 3px 0px;
`

// walking time sample data
const walkingTime = 90
const steps = 1000

const WalkingMode = ({ navigation }) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const toastRef = useRef()

  const showBackButtonToast = useCallback(() => {
    toastRef.current.show("'종료' 버튼을 이용하세요.")
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
        >
          <Marker
            coordinate={location}
            image={require('../../assets/icons/pencil.png')}
            width={65}
            height={65}
            onClick={() => console.log('marker click')}
          ></Marker>
        </NaverMapView>
        <InfoContainer>
          <WalkingInfoText>
            <Ionicons name="time" color="#4495D0" size={30} />
            {'\t'}
            {Math.floor(walkingTime / 60)}시간 {walkingTime % 60}분
          </WalkingInfoText>
          <WalkingInfoText>
            <MaterialCmIcons name="walk" color="#4495D0" size={30} />
            {'\t'}
            {steps}보
          </WalkingInfoText>
        </InfoContainer>
      </Container>
      <ButtonContainer>
        <Pressable onPress={() => console.log('BAG touched')}>
          <MaterialIcons
            name="inventory"
            size={35}
            color="#4495D0"
          ></MaterialIcons>
          <ButtonText>인벤토리</ButtonText>
        </Pressable>
        <Pressable onPress={() => console.log('PAPER touched')}>
          <Ionicons
            name="newspaper-outline"
            size={35}
            color="#4495D0"
          ></Ionicons>
          <ButtonText>페이퍼</ButtonText>
        </Pressable>
        <Pressable onPress={() => console.log('CHATTING touched')}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={35}
            color="#4495D0"
          ></Ionicons>
          <ButtonText>{'\t'}채팅</ButtonText>
        </Pressable>
        <Pressable onPress={() => console.log('CLOSE touched')}>
          <Ionicons
            name="close-circle-outline"
            size={35}
            color="red"
          ></Ionicons>
          <ButtonText>{'\t'}종료</ButtonText>
        </Pressable>
      </ButtonContainer>
      <Toast
        ref={toastRef}
        positionValue={useWindowDimensions().height * 0.12}
        fadeInDuration={300}
        fadeOutDuration={2000}
        style={{ backgroundColor: '#4495D0' }}
      />
    </>
  )
}

export default WalkingMode
