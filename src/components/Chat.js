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

const Chat = ({
  showChat,
  toggleChat,
  chatAnimation,
  sendMessageEmit,
  chatMessages,
  setChatMessages,
  userInfo,
}) => {
  useEffect(() => {
    console.log('채팅 서버 연결됨')

    //시스템 메세지 전송 필요
    return () => {
      console.log('채팅 서버 연결 끊김')
    }
  }, [])

  const onSend = useCallback(
    (newMessages = []) => {
      const appendMessage = GiftedChat.append(chatMessages, newMessages)

      setChatMessages(appendMessage)
      sendMessageEmit(appendMessage)
    },
    [chatMessages],
  )

  if (!showChat) return <></>
  return (
    <Container>
      <Animated.View
        style={{ ...styles.chat, transform: [{ scale: chatAnimation }] }}
      >
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
            messages={chatMessages}
            onSend={(messages) => onSend(messages)}
            renderUsernameOnMessage={true}
            user={{
              _id: userInfo.id,
              name: userInfo.nickname,
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
    width: '68%',
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
