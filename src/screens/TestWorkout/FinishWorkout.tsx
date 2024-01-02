import { View, Text } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../../@types/navigation"
import { Button, TextInput } from "react-native-paper"

const FinishWorkout = () => {
  const navigation = useNavigation<TabNavigationType>()
  return (
    <View>
      <Text>Nice Work!</Text>
      <TextInput placeholder="How did it go?"></TextInput>
      <Button onPress={() => navigation.navigate("Protocol")}>Finish</Button>
    </View>
  )
}

export default FinishWorkout
