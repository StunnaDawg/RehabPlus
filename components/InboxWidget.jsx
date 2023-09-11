import { View, Text, Button } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"

const InboxWidget = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1 flex-row justify-between m-4">
      <View className="justify-center">
        <Text className="text-3xl font-bold">Notifications</Text>
        <Button title="View" onPress={() => navigation.navigate("Inbox")} />
      </View>

      <View>
        <Text className="text-xl font-bold">Recent Messages</Text>
        <View>
          <Text className="text-lg">User</Text>
          <Text className="text-s">2 Hours ago</Text>
          <Text className="text-xs">Hello I am messaging.....</Text>
          <Button title="View" onPress={() => navigation.navigate("Inbox")} />
        </View>
        <View className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></View>
        <View>
          <Text className="text-lg">User</Text>
          <Text className="text-s">2 Hours ago</Text>
          <Text className="text-xs">Yo, I am here</Text>
          <Button title="View" onPress={() => navigation.navigate("Inbox")} />
        </View>
      </View>
    </View>
    
  )
}

export default InboxWidget
