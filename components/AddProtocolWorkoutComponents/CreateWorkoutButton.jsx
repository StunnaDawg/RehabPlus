import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useWorkoutContext } from "../../addWorkoutProtocol"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"

const CreateWorkoutButton = ({title, description, exercises}) => {
    const [workoutData, setNewWorkoutData] = useWorkoutContext([])
    const [completeWorkoutData, setCompleteWorkoutData] = useCompleteWorkoutContext([])
    const navigation = useNavigation()
    
  return (
    <Button
      icon="plus"
      onPress={async () => {await setCompleteWorkoutData([...completeWorkoutData, [title, description, exercises]]); navigation.navigate("AddProtocolWorkoutScreen")}}
    >
      Create Workout
    </Button>
  )
}

export default CreateWorkoutButton
