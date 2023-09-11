import { View, Text, Button } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"

const ProtocolWidget = () => {
  const navigation = useNavigation()
  return (
    <>
    <View className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></View>
    <View className="flex-1">
      <Button
        title="Protocols"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onPress={() => navigation.navigate("Protocol")}
      />
    </View>
    </>
  )
}

export default ProtocolWidget
