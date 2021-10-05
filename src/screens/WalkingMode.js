import React from 'react'
import {View, Text} from 'react-native'
import {Button} from '@ant-design/react-native'

//지도
//
const WalkingMode = ({navigation}) => {
    return (
        <View>
            <View>지도UI</View>
            <View>하단 메뉴
                <View onPress={
                    
                }>가방</View>
                <View>페이퍼</View>
                <View>종료</View>
            </View> 
        </View>
    );
  }


export default WalkingMode