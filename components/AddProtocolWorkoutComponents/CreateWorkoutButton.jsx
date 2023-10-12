import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useWorkoutContext } from "../../addWorkoutProtocol"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"
import { useSingleWorkoutContext } from "../../workoutContext"

const CreateWorkoutButton = ({title, description, exercises}) => {
    const [workoutData, setNewWorkoutData] = useWorkoutContext([])
    const [completeWorkoutData, setCompleteWorkoutData] = useCompleteWorkoutContext([])
    const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
        []
      )
    const navigation = useNavigation()
    
  return (
    <Button
      icon="plus"
      onPress={async () => {await setCompleteWorkoutData(prevData => ([
        ...prevData,
        { title, description, exercises }
      ])); setNewWorkoutData([]); setExerciseWorkoutData([]); navigation.navigate("NewProtocol")}}
    >
      Create Workout
    </Button>
  )
}

export default CreateWorkoutButton
