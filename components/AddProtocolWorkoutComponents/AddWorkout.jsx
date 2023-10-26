import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { useIsFocused } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"

const AddWorkout = ({protocolTitle, protocolOutline, protocolPublic, protocolPhases}) => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useEffect(() => {
    console.log("complete workout data in add workout", ...completeWorkoutData)
  }, [isFocused])
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.navigate("CreateWorkout")}
          icon="plus"
        >
          Add Workout
        </Button>
      </View>

      <View>
      {completeWorkoutData.map((workout, index) => (
    <CompleteWorkoutWidget key={index} workoutTitle={workout.title} />
  ))}
      </View>
    </>
  )
}

export default AddWorkout
