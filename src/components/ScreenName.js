import React from 'react'
import styled from 'styled-components'
import { Text } from 'react-native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.mainBackground};
`

const ScreenName = ({ name, children }) => {
  return (
    <Container>
      <Text
        style={{
          fontSize: 40,
          fontFamily: 'BMHANNAAir_ttf',
          paddingTop: '5%',
          paddingLeft: '4%',
          paddingBottom: '3%',
          textShadowColor: 'gray',
          textShadowRadius: 2,
        }}
      >
        {name}
      </Text>
      {children}
    </Container>
  )
}

export default ScreenName
