import { View, Text, ScrollView, RefreshControl } from "react-native"
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
import GetSingleWorkout from "../../../functions/getSingleWorkout"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { useEditWorkoutContext } from "../../../context/editWorkoutContext"
import UpdateWorkoutButton from "./UpdateWorkoutButton"

const EditCreatedWorkout = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { editWorkoutData } = useEditWorkoutContext()
  const [currentWorkout, setCurrentWorkout] = useState<Workout | undefined>()
  const [workoutTitleText, setWorkoutTitleText] = useState<string | undefined>(
    ""
  )

  const { currentWorkoutId } = useCurrentWorkoutIdContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { refreshKey } = useRefreshKeyContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState<
    string | undefined
  >("")
  const { setExerciseData, exerciseData } = useExerciseContext()
  const navigation = useNavigation<NavigationType>()
  const isFocused = useIsFocused()

  const refreshPage = async () => {
    setRefreshing(true)
    try {
      console.log("current workout recieved!!!!!!!!!!!!", editWorkoutData)
      if (editWorkoutData.workout?.exercises != undefined) {
        setExerciseData(editWorkoutData?.workout?.exercises)
      }
      setRefreshing(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    refreshPage()
  }, [editWorkoutData])

  useEffect(() => {
    console.log("help")
    if (editWorkoutData.workout?.title) {
      setWorkoutTitleText(editWorkoutData.workout.title)
    }

    if (editWorkoutData.workout?.description) {
      setWorkoutDescriptionText(editWorkoutData.workout.description)
      console.log("updated")
    }
  }, [editWorkoutData])

  useEffect(() => {
    console.log("this is the id of this workout", currentWorkoutId)
  }, [currentWorkoutId])

  useEffect(() => {
    console.log("current edit workout data", editWorkoutData)
  }, [editWorkoutData])

  return (
    <>
      <ScrollView
        className="bg-slate-500"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshPage()}
          />
        }
      >
        <View className="mx-4 my-1">
          <UpdateWorkoutButton
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
            placeholder={workoutTitleText}
          ></TextInput>
        </View>

        <View className="mx-4 my-1">
          <Text>Workout Description</Text>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setWorkoutDescriptionText(text)}
            placeholder={workoutDescriptionText}
          ></TextInput>
        </View>
        <View className="mx-4 my-1">
          <Button
            textColor="black"
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
            console.log(
              "reps and sets of exercise",
              exercise.exercise.title,
              exercise.reps?.toString(),
              "and",
              exercise.sets?.toString()
            )
            return (
              <ExerciseWidget
                key={exercise.exercise.id}
                id={exercise.exercise.id}
                exerciseTitle={exercise.exercise.title}
                categoryId={exercise.categoryId}
                letter={letterData}
                index={index + 1}
                reps={exercise.reps?.toString()}
                sets={exercise.sets?.toString()}
              />
            )
          })}
        </ScrollView>
      </ScrollView>
    </>
  )
}

export default EditCreatedWorkout
