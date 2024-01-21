import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import {
  Workout,
  WorkoutExercise,
  ExerciseDataBaseExercise,
} from "../../../@types/firestore"
import GetSingleWorkout from "../../../functions/getSingleWorkout"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ViewWorkoutsPhasesProps = {
  workoutId?: string
  protocolId: string
  phaseId: string
}

const ViewWorkoutsPhases = ({
  workoutId,
  protocolId,
  phaseId,
}: ViewWorkoutsPhasesProps) => {
  const [workout, setWorkout] = useState<Workout>({} as Workout)
  useEffect(() => {
    if (workoutId) {
      GetSingleWorkout(workoutId, protocolId, setWorkout, phaseId)
    }
  }, [])
  return (
    <View>
      {workout.workout?.exercises?.map((exerciseInWorkout, index) => (
        <View key={exerciseInWorkout.exercise.id}>
          <Text>
            {index + 1}: {exerciseInWorkout.exercise.title}
          </Text>
          <Text>Sets: {exerciseInWorkout.sets}</Text>
          <Text>Reps: {exerciseInWorkout.reps}</Text>
        </View>
      ))}
    </View>
  )
}

export default ViewWorkoutsPhases
