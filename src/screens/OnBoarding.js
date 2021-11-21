import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'
import OnBoard from 'react-native-onboarding-swiper'

const OnBoarding = ({ navigation }) => {
  return (
    <OnBoard
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/images/welcome_icon.png')}
              style={styles.image}
            />
          ),
          title: '워크투게더에 오신 것을 환영합니다!',
          subtitle: '...',
        },
        {
          backgroundColor: '#fff',
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
      titleStyles={styles.titleText}
      imageContainerStyles={styles.imageContainer}
      onSkip={() => navigation.navigate('Login')}
    />
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'ONEMobileRegular',
  },
  image: {
    width: 150,
    height: 150,
  },
})
