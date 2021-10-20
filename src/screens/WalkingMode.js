import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Pressable,
  Text,
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
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import Modal from 'react-native-modal'

import WalkingInfo from '../components/WalkingInfo'
import requestPermission from '../utils/requestPermission'
import LabInfo from '../components/LabInfo'
import { SERVER_URL } from '@env'

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

const FinishConfirmText = styled.Text`
  font-size: 28px;
  font-family: BMHANNAAir_ttf;
  color: white;
  margin: 20px 0px;
`

const FinishConfirmButtonText = styled.Text`
  font-size: 20px;
  align-items: center;
  color: yellow;
  font-family: BMHANNAAir_ttf;
  margin: 18px 0px;
`

const WalkingMode = ({ navigation }) => {
  const initialLocation = { latitude: 37.564362, longitude: 126.977011 }
  const [location, setLocation] = useState(initialLocation)
  const [modalVisible, setModalVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [walkingTime, setWalkingTime] = useState(130) //초기값 0으로 setting 필요
  const [steps, setSteps] = useState(1542) //초기값 0으로 setting 필요

  const toastRef = useRef()
  const ref = useRef(null)
  const usedNavigation = useNavigation()

  const showBackButtonToast = useCallback(() => {
    toastRef.current.show("'종료' 버튼을 이용하세요.")
  }, [])

  const finishModal = () => {
    setModalVisible(!modalVisible)
  }

  const finishWalkingMode = () => {
    // 워킹 모드 종료 후 워킹 데이터 처리, 결과 출력
    // 종료 후 이동화면은 추후 변경

    // navigation stack clear
    usedNavigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

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
        <Pressable onPress={finishModal}>
          <Ionicons
            name="close-circle-outline"
            size={35}
            color="red"
          ></Ionicons>
          <ButtonText>{'\t'}종료</ButtonText>
        </Pressable>
        <Modal isVisible={modalVisible}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <FinishConfirmText>워킹모드를 종료하시겠습니까?</FinishConfirmText>

            <Pressable onPress={(finishModal, finishWalkingMode)}>
              <FinishConfirmButtonText>네, 그만할래요.</FinishConfirmButtonText>
            </Pressable>
            <Pressable onPress={finishModal}>
              <FinishConfirmButtonText>
                아니요, 더 할래요.
              </FinishConfirmButtonText>
            </Pressable>
          </View>
        </Modal>
      </ButtonContainer>
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
        style={{ backgroundColor: '#4495D0' }}
      />
    </>
  )
}

export default WalkingMode
