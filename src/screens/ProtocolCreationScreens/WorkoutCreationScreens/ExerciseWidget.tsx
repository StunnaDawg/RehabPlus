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
  reps?: string
  sets?: string
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
      <View className=" flex flex-row justify-between items-center mt-3 mx-8 bg-slate-300 rounded border p-1">
        <View>
          <Text className="text-lg">
            {letter}
            {index}.
          </Text>
          <Text className="text-lg">
            {" "}
            {exerciseTitle ? exerciseTitle : "Loading..."}
          </Text>
        </View>
        <View>
          <Text>reps: {reps !== undefined ? reps : "0"}</Text>
          <Text>sets: {reps !== undefined ? sets : "0"}</Text>
        </View>
      </View>
    </>
  )
}

export default ExerciseWidget
