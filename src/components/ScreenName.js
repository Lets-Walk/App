import React from 'react'
import styled from 'styled-components'
import { Text, Image, View } from 'react-native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.mainBackground};
`

const ScreenName = ({ name, children }) => {
  if (name !== '워킹크루 매칭') {
    return (
      <Container>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '8%',
            marginTop: 5,
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
        {children}
      </Container>
    )
  } else {
    return <Container>{children}</Container>
  }
}

export default ScreenName
