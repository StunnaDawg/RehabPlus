import { View, Text } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../@types/navigation"
import { Button, TextInput } from "react-native-paper"

const FinishWorkout = () => {
  const navigation = useNavigation<TabNavigationType>()
  return (
    <>
      <View className="flex flex-1 flex-row justify-center items-center bg-slate-500">
        <View className="flex flex-col content-center items-center">
          <Text className="font-bold text-3xl">Nice Work!</Text>
          <Button
            textColor="black"
            onPress={() => navigation.navigate("Protocol")}
          >
            Finish
          </Button>
        </View>
      </View>
    </>
  )
}

export default FinishWorkout
