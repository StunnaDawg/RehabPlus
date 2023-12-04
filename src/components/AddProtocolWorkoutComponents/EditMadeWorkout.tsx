import { View, Text, ScrollView, RefreshControl } from "react-native"
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
import UpdateWorkoutButton from "./UpdateWorkoutButton"

const EditCreatedWorkout = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { editWorkoutData } = useEditWorkoutContext()
  const [currentWorkout, setCurrentWorkout] = useState<Workout | undefined>()
  const [workoutTitleText, setWorkoutTitleText] = useState<string | undefined>(
    editWorkoutData.workout?.title
  )

  const { currentWorkoutId, setCurrentWorkoutId } = useCurrentWorkoutIdContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { refreshKey } = useRefreshKeyContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState<
    string | undefined
  >(editWorkoutData.workout?.description)
  const { setExerciseData, exerciseData } = useExerciseContext()
  const navigation = useNavigation<NavigationType>()
  const isFocused = useIsFocused()

  const refreshPage = async () => {
    setRefreshing(true)
    try {
      if (editWorkoutData.id) {
        console.log("made it")
        setCurrentWorkoutId(editWorkoutData?.id)
      }
      console.log("current workout recieved!!!!!!!!!!!!", editWorkoutData)
      if (editWorkoutData.workout?.exercises != undefined) {
        setExerciseData(editWorkoutData?.workout?.exercises)
      }

      if (editWorkoutData.workout?.title) {
        setWorkoutTitleText(editWorkoutData.workout.title)
      }

      if (editWorkoutData.workout?.description) {
        setWorkoutDescriptionText(editWorkoutData.workout.description)
      }
    } catch (err) {
      console.error(err)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    refreshPage()
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshPage()}
          />
        }
      >
        <View className="mx-4 my-1">
          {editWorkoutData?.id ? (
            <UpdateWorkoutButton
              workout={{
                title: workoutTitleText,
                description: workoutDescriptionText,
                exercises: exerciseData,
              }}
            />
          ) : (
            <Text>No Id Associated</Text>
          )}
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
      </ScrollView>
    </>
  )
}

export default EditCreatedWorkout
