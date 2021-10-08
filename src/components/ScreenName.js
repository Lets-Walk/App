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
          fontSize: 36,
          fontFamily: 'BMHANNAAir_ttf',
          fontWeight: 'bold',
          padding: '3%',
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
