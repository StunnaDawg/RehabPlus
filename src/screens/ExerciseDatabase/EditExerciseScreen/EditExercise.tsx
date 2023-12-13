import { View, Text } from "react-native"
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native"
import React from "react"
import { RouteParamsType } from "../../../@types/navigation"

const EditExercise = () => {
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const navigation = useNavigation()

  const { title, id } = route.params

  return (
    <View>
      <Text>{title}</Text>
      <Text>{id}</Text>
    </View>
  )
}

export default EditExercise
