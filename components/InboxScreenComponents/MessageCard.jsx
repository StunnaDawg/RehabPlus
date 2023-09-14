import { View, Text } from "react-native"
import { Card, Avatar } from "react-native-paper"
import React from "react"

const MessageCard = ({name, message}) => {
  return (
    <>
      <Card className='m-4'>
        <Card.Content>
        <View className="flex-1 flex-row">
          <Avatar.Icon icon="account-circle" size={50} />
          <View className="flex-1 flex-col  mx-4">
            <Text className="font-bold text-2xl">{name}</Text>
            <Text className="font-semibold text-sm">{message}</Text>
          </View>
          <View className='flex-1 flex-row justify-end'>
            <Text>2h ago</Text>
          </View>
          </View>
        </Card.Content>
      </Card>
    </>
  )
}

export default MessageCard
