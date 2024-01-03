import { View, Text } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../@types/navigation"
import { Button, TextInput } from "react-native-paper"

const FinishWorkout = () => {
  const navigation = useNavigation<TabNavigationType>()
  return (
    <>
      <View className="flex flex-1 flex-row justify-center items-center">
        <View className="flex flex-col content-center items-center">
          <Text className="font-bold text-3xl">Nice Work!</Text>
          <Text className="font-bold text-xl">How did the Workout go?</Text>
          <TextInput className="p-5"></TextInput>
          <Button onPress={() => navigation.navigate("Protocol")}>
            Finish
          </Button>
        </View>
      </View>
    </>
  )
}

export default FinishWorkout
