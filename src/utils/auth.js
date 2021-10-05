import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { SERVER_URL } from '@env'

const auth = async (setUser) => {
  const token = await AsyncStorage.getItem('token')
  try {
    const response = await axios.get(SERVER_URL + '/api/auth/me', {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 10000,
    })
    console.log('jwt auth success')
    setUser(response.data.user)
  } catch (err) {
    console.log(err)
    if(err.response)
      console.log(err.response.data)
  }
}

export default auth
