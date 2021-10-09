import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap'
import Geolocation from 'react-native-geolocation-service'
import requestPermission from './utils/requestPermission'

export default function MyMap() {
  const initialLocation = { latitude: 0, longitude: 0 }
  const [location, setLocation] = useState(initialLocation)

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

  return (
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      showsMyLocationButton={true}
      center={{ ...location, zoom: 16 }}
      // onTouch={(e) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      // onCameraChange={(e) => console.warn('onCameraChange', JSON.stringify(e))}
      // onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
    >
      <Marker
        coordinate={location}
        image={require('../assets/icons/pencil.png')}
        width={65}
        height={65}
        onClick={() => console.log('marker click')}
      ></Marker>
    </NaverMapView>
  )
}
