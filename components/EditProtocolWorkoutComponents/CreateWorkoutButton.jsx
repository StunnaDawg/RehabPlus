import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useWorkoutContext } from "../../context/addWorkoutProtocol"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { useSingleWorkoutContext } from "../../context/workoutContext"

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
      ])); setNewWorkoutData([]); setExerciseWorkoutData([]); console.log('ya you pressed me'); navigation.navigate("EditProtocolWorkoutScreen")}}
    >
      Create Workout
    </Button>
  )
}

export default CreateWorkoutButton
