import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RouteParamsType } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import GetSingleWorkout from "../../functions/getSingleWorkout"
import { doc } from "firebase/firestore"
import { Workout } from "../../@types/firestore"
import CurrentExercise from "./components/Workout"
import { Button } from "react-native-paper"

const TestWorkout = () => {
  const [exerciseNumberState, setExerciseNumberState] = useState<number>(0)
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const [workout, setWorkout] = useState<Workout>({} as Workout)
  const protocolId = route.params?.protocolId
  const workoutId = route.params.id
  const phaseId = route.params.phaseId
  const navigation = useNavigation<NavigationType>()

  const handleExerciseChange = () => {
    setExerciseNumberState((prevExercise) => prevExercise + 1)
  }

  useEffect(() => {
    if (workoutId && protocolId && phaseId) {
      GetSingleWorkout(workoutId, protocolId, setWorkout, phaseId)
    }
  }, [])

  useEffect(() => {
    if (workout.workout?.exercises) {
      if (exerciseNumberState >= workout.workout?.exercises?.length) {
        navigation.navigate("FinishWorkout")
      }
    }
  }, [exerciseNumberState])

  return (
    <View>
      <View>
        {workout.workout?.exercises ? (
          workout.workout?.exercises?.map((exercise, index) => (
            <View key={index}>
              <CurrentExercise
                exerciseNumber={index}
                exerciseNumberState={exerciseNumberState}
                exerciseDescription={exercise.exercise.description}
                exerciseTitle={exercise.exercise.title}
                exerciseSets={exercise.sets}
              />
            </View>
          ))
        ) : (
          <Text>L</Text>
        )}
        <Button onPress={handleExerciseChange}>Next</Button>
      </View>
    </View>
  )
}

export default TestWorkout
