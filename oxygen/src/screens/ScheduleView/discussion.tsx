import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

interface Props {
  id: string
}

export default function Discussion ({ id }: Props) {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any'
      }
    }
  ])
  function handleSend (newMessages = []) {
    setMessages(GiftedChat.append(messages, newMessages))
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: 1
      }}
    />
  )
}
