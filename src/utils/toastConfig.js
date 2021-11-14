// App.jsx
import React from 'react'
import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { View, Text, Image } from 'react-native'
/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  obtainItem: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        // borderColor: 'black',
        // borderWidth: 1,
        justifyContent: 'center',
        elevation: 15,
      }}
    >
      <View
        style={{
          // borderColor: 'blue',
          // borderWidth: 1,
          height: 40,
          width: 8,
          left: 10,
          backgroundColor: '#8EECF5',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: 40,
          width: 280,
          left: 25,
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri: props.logo }}
          width={20}
          height={20}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
          }}
        />
        <Text
          style={{
            left: 35,
            fontSize: 16,
            fontFamily: 'ONEMobileRegular',
          }}
          numberOfLines={1}
        >
          {`${props.userName}님이 ${props.item}아이템을 획득했습니다.`}
        </Text>
      </View>
    </View>
  ),

  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
}

export default toastConfig
