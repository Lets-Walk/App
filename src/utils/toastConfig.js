// App.jsx
import React from 'react'
import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { View, Text, Image, StyleSheet } from 'react-native'
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
  obtainItem: ({ props }) => (
    <View style={styles.container}>
      <View style={styles.colorBar} />
      <View style={styles.content}>
        <Image
          source={{ uri: props.logo }}
          width={20}
          height={20}
          style={styles.logo}
        />
        <Text style={styles.text} numberOfLines={1}>
          {`${props.userName}님이 ${props.item}을(를) 획득했습니다.`}
        </Text>
      </View>
    </View>
  ),
}

export default toastConfig

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    elevation: 5,
  },
  colorBar: {
    height: 40,
    width: 8,
    left: 10,
    backgroundColor: '#8EECF5',
    borderRadius: 10,
  },
  content: {
    position: 'absolute',
    height: 40,
    width: 280,
    left: 25,
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  text: {
    left: 35,
    fontSize: 17,
    fontFamily: 'BMHANNAAir_ttf',
  },
})
