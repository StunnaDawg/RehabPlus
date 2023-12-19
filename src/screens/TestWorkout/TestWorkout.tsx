import { View, Text } from "react-native"
import React from "react"
import { RouteParamsType } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"

const TestWorkout = () => {
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const protocolId = route.params?.protocolId
  const workoutId = route.params.id
  const phaseId = route.params.phaseId
  return (
    <View>
      <Text>{protocolId}</Text>
      <Text>{workoutId}</Text>
      <Text>{phaseId}</Text>
    </View>
  )
}

export default TestWorkout
