import React from 'react'
import { View, Text, TouchableOpacit, Pressable } from 'react-native'
import styled from 'styled-components/native'
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap'
import GetLocation from 'react-native-get-location'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCmIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// 현재 위치정보 Load -> emulator에서는 google 본사 위치로 고정되어있음
GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
  .then((location) => {
    console.log(location)
  })
  .catch((error) => {
    const { code, message } = error
    console.warn(code, message)
  })
// sample location data
const P0 = { latitude: 37.564362, longitude: 126.977011 }
const P1 = { latitude: 37.565051, longitude: 126.978567 }
const P2 = { latitude: 37.565383, longitude: 126.976292 }

// walking time sample data
const walkingTime = 90
const steps = 1000

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
  right: 10;
  top: 10;
  height: 17%;
  width: 40%;
  background-color: #ffffff;
  padding: 3px 5px;
  border-radius: 10px;
  justify-content: space-around;
  border-width: 1;
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

const WalkingMode = ({ navigation }) => {
  return (
    <>
      <Container>
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 16 }}
          onTouch={(e) =>
            console.warn('onTouch', JSON.stringify(e.nativeEvent))
          }
          onCameraChange={(e) =>
            console.warn('onCameraChange', JSON.stringify(e))
          }
          onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
        >
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P2}
            pinColor="red"
            onClick={() => console.warn('onClick! p2')}
          />
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
    </>
  )
}

export default WalkingMode
