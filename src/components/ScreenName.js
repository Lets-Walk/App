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
          marginTop: 2,
        }}
      >
        <Image
          source={require('../utils/screen_top.png')}
          style={{
            aspectRatio: 2846 / 759,
            height: '90%',
          }}
        />
      </View>
      {children}
    </Container>
  )
}

export default ScreenName
