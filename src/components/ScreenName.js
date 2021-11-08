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
          fontFamily: 'Cafe24Shiningstar',
          paddingTop: '3%',
          paddingLeft: '7%',
          paddingBottom: '3%',
          textShadowColor: 'gray',
          textShadowRadius: 2,
          color: '#1B97E2',
        }}
      >
        {name}
      </Text>
      {children}
    </Container>
  )
}

export default ScreenName
