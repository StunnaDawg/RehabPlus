import { Alert, StyleSheet, View } from "react-native"
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper"
import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { WorkoutExercise } from "../../../@types/firestore"

type ExerciseWidgetProps = {
  id: string
  categoryId: string
  exerciseTitle: string
  letter: string
  index: number
  reps?: number
  sets?: number
}

const ExerciseWidget = ({
  id,
  categoryId,
  exerciseTitle,
  letter,
  index,
  reps,
  sets,
}: ExerciseWidgetProps) => {
  // const {workoutData, setWorkoutData} = useSingleWorkoutContext()
  // const {refreshKey, setRefreshKey} = useRefreshKeyContext()
  const [widgetData, setWidgetData] = useState<WorkoutExercise>()
  const [exerciseSets, setExerciseSets] = useState<string>("")
  const [exerciseReps, setExerciseReps] = useState<string>("")

  useEffect(() => {
    console.log(id)
  }, [])

  return (
    <>
      <Card mode="outlined" className=" flex-1 mt-3 mx-8 bg-blue-400">
        <Card.Content className="flex-1 flex-row justify-center items-center">
          <Text variant="titleMedium">
            {letter}
            {index}.
          </Text>
          <Text variant="titleMedium">
            {" "}
            {exerciseTitle ? exerciseTitle : "Loading..."}
          </Text>
          <Text>reps: {reps !== undefined ? reps?.toString() : "0"}</Text>
          <Text>sets: {reps !== undefined ? sets?.toString() : "0"}</Text>
        </Card.Content>
      </Card>
    </>
  )
}

export default ExerciseWidget
