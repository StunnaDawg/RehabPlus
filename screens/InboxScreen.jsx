import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageCard from '../components/InboxScreenComponents/MessageCard'
import InboxHeader from '../components/InboxScreenComponents/InboxHeader'

const InboxScreen = () => {
  return (
    <ScrollView>
        <InboxHeader />
        <View className='flex-1 items-center flex-row justify-center mt-52'>
        <Text className='text-3xl font-extrabold'>Coming soon...</Text>
        </View>
      {/* <MessageCard name={'Jorge'} message={'Hey man...'} />
      <MessageCard name={'Kerry'} message={'Question'} />
      <MessageCard name={'Danielle'} message={'Dog'} />
      <MessageCard name={'Harold'} message={'Cat jfkdsdfksdfn'} />
      <MessageCard name={'Sevn'} message={'asdfsdfsf'} />
      <MessageCard name={'Chad'} message={'rrrfrfrfrf'} />
      <MessageCard name={'Kenny'} message={'sdfsdfsdfsd'} /> */}
    </ScrollView>
  )
}

export default InboxScreen