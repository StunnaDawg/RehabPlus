import { View, Text } from 'react-native'
import { Searchbar, Button, IconButton } from "react-native-paper"
import React, { useState } from 'react'

const InboxHeader = () => {
    const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
    <View className="flex-1 flex-row m-4 items-center justify-between">
    <Text className="font-bold text-3xl">Messages</Text>
    <IconButton icon='message-plus-outline' size={30}></IconButton>
    </View>
    <View className='flex-1'>
    <Searchbar
      placeholder="Search Messages"
      onChangeText={(query) => {
        setSearchQuery(query)
      }}
      value={searchQuery}
    />
  </View>
  </>
  )
}

export default InboxHeader