import React from 'react'
import {View, Text} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 30px;
`

/*
    하단 네비게이션 바 아이콘, 색상 변경
    배경색 조정
    상단 페이지 제목 
    
*/

const Home = () => {
    return (
      <Container>
        <Text>Home!</Text>
      </Container>
    );
  }


export default Home