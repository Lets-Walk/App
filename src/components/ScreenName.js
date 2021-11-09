import React from 'react'
import styled from 'styled-components'
import { Text, Image, View } from 'react-native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.mainBackground};
`

const ScreenName = ({ name, children }) => {
  return (
    <Container>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '8%',
        }}
      >
        <Image
          source={require('../utils/screen_top.png')}
          style={{
            aspectRatio: 3353 / 744,
            flex: 1,
          }}
        />
      </View>
      {/* <Text
        style={{
          fontSize: 40,
          fontFamily: 'Cafe24Shiningstar',
          paddingTop: '3%',
          paddingLeft: '5%',
          paddingBottom: '3%',
          textShadowColor: 'gray',
          textShadowRadius: 2,
          color: '#1B97E2',
        }}
      >
        {name}
      </Text> */}
      {children}
    </Container>
  )
}

export default ScreenName
