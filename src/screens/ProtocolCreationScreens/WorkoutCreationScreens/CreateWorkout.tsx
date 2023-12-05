import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useRefreshKeyContext } from "../../../context/refreshKey"
import { NavigationType } from "../../../@types/navigation"
import { Workout, WorkoutExercise } from "../../../@types/firestore"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useCurrentWorkoutIdContext } from "../../../context/workoutIdContext"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"

const CreateWorkout = () => {
  const [workoutTitleText, setWorkoutTitleText] = useState<string | undefined>(
    ""
  )
  const { currentWorkoutId } = useCurrentWorkoutIdContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { refreshKey } = useRefreshKeyContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState("")
  const { newProtocolData } = useNewProtocolDataContext()
  const { exerciseData } = useExerciseContext()
  const [exercises, setExercises] = useState<WorkoutExercise[]>([])
  const navigation = useNavigation<NavigationType>()
  const protocolId = newProtocolData.id

  // useEffect(() => {
  //   const awaitLoading = async () => {
  //     setExercises((prevData) => [...prevData, ...exerciseData])
  //     console.log("widget map", exercises)
  //   }
  //   awaitLoading()
  // }, [])

  useEffect(() => {
    console.log("current workout id", currentWorkoutId)
  }, [])

  return (
    <>
      <View className="mx-4 my-1">
        <CreateWorkoutButton
          workout={{
            title: workoutTitleText,
            description: workoutDescriptionText,
            exercises: exerciseData,
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
        {exerciseData?.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log(index, exercise.exercise.id)
          return (
            <ExerciseWidget
              key={exercise.exercise.id}
              id={exercise.exercise.id}
              exerciseTitle={exercise.exercise.title}
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
