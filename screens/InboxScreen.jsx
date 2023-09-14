import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageCard from '../components/InboxScreenComponents/MessageCard'

const InboxScreen = () => {
  return (
    <ScrollView>
      <MessageCard />
    </ScrollView>
  )
}

export default InboxScreen