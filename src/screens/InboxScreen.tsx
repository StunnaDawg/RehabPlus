import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import InboxHeader from '../components/InboxScreenComponents/InboxHeader'

const InboxScreen = () => {
  return (
    <ScrollView>
        <InboxHeader />
        <View className='flex-1 items-center flex-row justify-center mt-52'>
        <Text className='text-3xl font-extrabold'>Coming soon....</Text>
        </View>
    </ScrollView>
  )
}

export default InboxScreen