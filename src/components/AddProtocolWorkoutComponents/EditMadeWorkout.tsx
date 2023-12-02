import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useRefreshKeyContext } from "../../context/refreshKey"
import { NavigationType } from "../../@types/navigation"
import { Workout, WorkoutExercise } from "../../@types/firestore"
import { useExerciseContext } from "../../context/exerciseContext"
import { useCurrentWorkoutIdContext } from "../../context/workoutIdContext"
import GetSingleWorkout from "../../functions/getSingleWorkout"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { useEditWorkoutContext } from "../../context/editWorkoutContext"

const EditCreatedWorkout = () => {
  const { editWorkoutData } = useEditWorkoutContext()
  const [currentWorkout, setCurrentWorkout] = useState<Workout | undefined>()
  const [workoutTitleText, setWorkoutTitleText] = useState<string>(
    editWorkoutData.workout?.title || "No Title Saved"
  )

  const { currentWorkoutId } = useCurrentWorkoutIdContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { refreshKey } = useRefreshKeyContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState<string>(
    editWorkoutData.workout?.description || "No Description Saved"
  )
  const { setExerciseData, exerciseData } = useExerciseContext()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    console.log("current workout recieved!!!!!!!!!!!!", editWorkoutData)
    if (editWorkoutData.workout?.exercises != undefined) {
      setExerciseData(editWorkoutData?.workout?.exercises)
    }
  }, [editWorkoutData])

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
        >
          {workoutTitleText}
        </TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Workout Description</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWorkoutDescriptionText(text)}
        >
          {workoutDescriptionText}
        </TextInput>
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

export default EditCreatedWorkout
