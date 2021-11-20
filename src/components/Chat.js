import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GiftedChat } from 'react-native-gifted-chat'

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`

const Chat = ({ showChat, toggleChat }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log('채팅 서버 연결됨')
    //시스템 메세지 전송 필요
    return () => {
      console.log('채팅 서버 연결 끊김')
      //시스템 메세지 전송 필요
    }
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages)
    })

    //소켓 전송 필요
  }, [])

  if (!showChat) return <></>
  return (
    <Container>
      <Animated.View style={{ ...styles.chat }}>
        <View style={styles.header}>
          <Text style={styles.headerFontColor}>CHATTING</Text>
          <Pressable
            onPress={toggleChat}
            style={{ position: 'absolute', right: '1%', top: 0 }}
          >
            <Ionicons name="close-outline" size={38} color="#ffffff" />
          </Pressable>
        </View>
        <View
          style={{
            flex: 10,
            flexDirection: 'row',
          }}
        >
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </Animated.View>
    </Container>
  )
}

export default React.memo(Chat)

const styles = StyleSheet.create({
  chat: {
    width: '70%',
    height: '60%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 15,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293241',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  headerFontColor: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'BMHANNA_11yrs_ttf',
    marginRight: 15,
  },
  patternContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#D9D9D9',
    borderRightWidth: 1,
  },
})
