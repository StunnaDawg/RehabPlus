import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import {
  Workout,
  WorkoutExercise,
  ExerciseDataBaseExercise,
} from "../../../@types/firestore"
import GetSingleWorkout from "../../../functions/getSingleWorkout"

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
      <Text>Workouts...</Text>
      {workout.workout?.exercises?.map((exerciseInWorkout) => (
        <Text key={exerciseInWorkout.exercise.id}>
          {exerciseInWorkout.exercise.title}
        </Text>
      ))}
    </View>
  )
}

export default ViewWorkoutsPhases
