import { Button } from '@ant-design/react-native';
import React from 'react'
import {View, Text} from 'react-native'


const CrewMatching = ({navigation}) => {
    return (
        <View>
        <Text>CrewMatching!</Text>
        <Button onPress={() => {
            navigation.navigate('워킹모드')
        }}>매칭시작</Button>
        </View>
    );
  }


export default CrewMatching