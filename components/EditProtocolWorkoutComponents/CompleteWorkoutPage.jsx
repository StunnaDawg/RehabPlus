import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"

import { useIsFocused } from "@react-navigation/native"
import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"

const EditWorkoutsPage = () => {
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
    <CompleteWorkoutEditWidget key={index} workoutTitle={workout.title} />
  ))}
      </View>
    </>
  )
}

export default EditWorkoutsPage
