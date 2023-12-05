import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../../../context/workoutContext"
import ExerciseWidget from "./ExerciseWidget"
import { useExerciseContext } from "../../../../context/exerciseContext"
import { useEditWorkoutContext } from "../../../../context/editWorkoutContext"
import { useIsFocused } from "@react-navigation/native"
import UpdateWorkoutsButton from "./UpdateWorkoutsButton"
import { useSingleEditProtocolContext } from "../../../../context/protocolContext"
import { useRefreshKeyContext } from "../../../../context/refreshKey"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { NavigationType } from "../../../../@types/navigation"

const EditWorkout = () => {
  const [isNewWorkout, setIsNewWorkout] = useState(false)
  const [onAppear, setOnAppear] = useState(true)
  const { editWorkoutData } = useEditWorkoutContext()
  const { protocolEditData } = useSingleEditProtocolContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { refreshKey } = useRefreshKeyContext()
  const { exerciseData, setExerciseData } = useExerciseContext()
  const defaultWorkoutDescription = useMemo(
    () =>
      editWorkoutData.workout ? editWorkoutData.workout.description : undefined,
    [editWorkoutData]
  )
  const defaultWorkoutTitle = useMemo(
    () => (editWorkoutData.workout ? editWorkoutData.workout.title : undefined),
    [editWorkoutData]
  )
  const defaultExercises = useMemo(
    () =>
      editWorkoutData.workout ? editWorkoutData.workout.exercises : undefined,
    [editWorkoutData]
  )
  const [workoutTitleText, setWorkoutTitleText] = useState(defaultWorkoutTitle)
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState(
    defaultWorkoutDescription
  )

  const navigation = useNavigation<NavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log("workout data", editWorkoutData)
    if (onAppear && defaultExercises !== undefined) {
      setExerciseData(defaultExercises)
      console.log("if onAppear workoutdata", exerciseData)
    }

    console.log("exerciseState update id", editWorkoutData.id)
    console.log("exerciseState protocol id", protocolEditData.userId)
  }, [isFocused])

  useEffect(() => {
    console.log("workout data", editWorkoutData)
    if (defaultExercises !== undefined) {
      setExerciseData(defaultExercises)
    }
    console.log("if onAppear workoutdata", exerciseData)
  }, [refreshKey, editWorkoutData])

  return (
    <>
      <View className="mx-4 my-1">
        {!isNewWorkout && editWorkoutData.id ? (
          <UpdateWorkoutsButton
            workoutTitle={workoutTitleText}
            workoutDescription={workoutDescriptionText}
            workoutExercises={exerciseData}
            workoutId={editWorkoutData.id}
            protocolId={protocolEditData.id}
            phaseId={currentPhasesId}
          />
        ) : null}
      </View>
      <View className="mx-4 my-1">
        <Text>Workout Title</Text>
        <TextInput
          mode="outlined"
          defaultValue={
            defaultWorkoutTitle !== null ? defaultWorkoutTitle : "loading..."
          }
          onChangeText={(text) => setWorkoutTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Workout Description</Text>
        <TextInput
          mode="outlined"
          defaultValue={
            defaultWorkoutDescription !== null
              ? defaultWorkoutDescription
              : "loading..."
          }
          onChangeText={(text) => setWorkoutDescriptionText(text)}
        ></TextInput>
      </View>
      <View className="mx-4 my-1">
        <Button
          icon="dumbbell"
          onPress={async () => {
            setOnAppear(false)
            navigation.navigate("ExerciseDataBase")
          }}
        >
          Add Exercise
        </Button>
      </View>
      <ScrollView className="pb-96">
        {exerciseData.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log("exercsie edit widget", index, exercise.exerciseId)
          if (editWorkoutData.id === undefined) {
            return <div>No Exercise Data</div>
          }

          return (
            <ExerciseWidget
              key={exercise.exerciseId}
              id={exercise.exerciseId}
              categoryId={exercise.categoryId}
              letter={letterData}
              index={index + 1}
              sets={exercise.sets}
              reps={exercise.reps}
              protocolId={protocolEditData.id}
              workoutId={editWorkoutData.id}
              userId={protocolEditData.userId}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

export default EditWorkout
