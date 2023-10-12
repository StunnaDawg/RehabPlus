import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"
import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { useIsFocused } from "@react-navigation/native"

const AddWorkout = () => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useEffect(() => {
    console.log("complete workout data", ...completeWorkoutData)
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
          <CompleteWorkoutWidget key={index} workoutTitle={workout[0]} />
        ))}
      </View>
    </>
  )
}

export default AddWorkout
