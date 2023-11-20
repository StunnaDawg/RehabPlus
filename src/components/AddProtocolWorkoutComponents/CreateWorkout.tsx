import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useRefreshKeyContext } from "../../context/refreshKey"
import { NavigationType } from "../../@types/navigation"
import { WorkoutExercise } from "../../@types/firestore"
import { useExerciseContext } from "../../context/exerciseContext"

const CreateWorkout = () => {
  const [workoutTitleText, setWorkoutTitleText] = useState("")
  const { refreshKey } = useRefreshKeyContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState("")
  const {exerciseData} = useExerciseContext()
  const [exerciseMap, setExerciseMap] = useState<WorkoutExercise[]>([])
  const isFocused = useIsFocused()
  const navigation = useNavigation<NavigationType>()


  useEffect(() => {
    const awaitLoading = async () => {
      setExerciseMap(exerciseData)
      console.log("widget map", exerciseMap)
    }
    awaitLoading()
  }, [isFocused])

  useEffect(() => {
    setExerciseMap(exerciseData)
  }, [exerciseData, refreshKey])

  return (
    <>
      <View className="mx-4 my-1">
        <CreateWorkoutButton
        workout= {{
          title: workoutTitleText, 
          description: workoutDescriptionText, 
          exercises: exerciseMap
        }}
        />
      </View>
      <View className="mx-4 my-1">
        <Text>Workout Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWorkoutTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Workout Description</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWorkoutDescriptionText(text)}
        ></TextInput>
      </View>
      <View className="mx-4 my-1">
        <Button
          icon="dumbbell"
          onPress={() => navigation.navigate("ExerciseDataBase")}
        >
          Add Exercise
        </Button>
      </View>
      <ScrollView className="pb-96">
        {exerciseMap.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log(index, exercise.exerciseId)
          return (
            <ExerciseWidget
              key={exercise.exerciseId}
              id={exercise.exerciseId}
              categoryId={exercise.categoryId}
              letter={letterData}
              index={index + 1}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

export default CreateWorkout
