import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"

import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { useIsFocused } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import SaveWorkoutsToPhaseButton from "./components/CreateProtocolButton"

const AddWorkout = () => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const navigation = useNavigation()
  const route = useRoute()
  const phaseId = route.params.phaseId
  return (
    <>
      <View className='flex-1 flex-row justify-around'>
        <Button
          onPress={ () => navigation.navigate("CreateWorkout")}
          icon="plus"
        >
          Add Workout
        </Button>
        <SaveWorkoutsToPhaseButton phaseId={phaseId} />
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
