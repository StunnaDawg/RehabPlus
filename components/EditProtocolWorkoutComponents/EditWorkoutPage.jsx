import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useSingleEditWorkoutContext } from "../../context/editWorkoutContext"
import { useIsFocused } from "@react-navigation/native"
import UpdateWorkoutsButton from "./UpdateWorkoutsButton"
import { useSingleProtocolContext } from "../../context/protocolContext"
import { useRefreshContext } from "../../context/refreshKey"

const EditWorkout = () => {
  const [editWorkoutData, setEditWorkoutData] = useSingleEditWorkoutContext([])
  const [protocolEditData] = useSingleProtocolContext()
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [refreshKey, setRefreshKey] = useRefreshContext(false)
  const [workoutTitleText, setWorkoutTitleText] = useState(defaultWorkoutTitle)
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState(defaultWorkoutDescription)
  const [isNewWorkout, setIsNewWorkout] = useState(false)
  const [onAppear, setOnAppear] = useState(true)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const defaultWorkoutTitle = useMemo(() => editWorkoutData.workout.title, [editWorkoutData]);

const defaultWorkoutDescription = useMemo(() => editWorkoutData.workout.description, [editWorkoutData]);

const defaultExercises = useMemo(() => editWorkoutData.workout.exercises, [editWorkoutData]);
  let workoutId = editWorkoutData.id

  useEffect(() => {
    console.log('workout data', editWorkoutData)
    if (onAppear) {
      setExerciseWorkoutData(defaultExercises)
      console.log('if onAppear workoutdata',exerciseWorkoutData)
    } 

    console.log("exerciseState update id", editWorkoutData.id)
    console.log("exerciseState protocol id", protocolEditData.userId)
    
  }, [isFocused])

  useEffect(() => {
    console.log('workout data', editWorkoutData)
      setExerciseWorkoutData(defaultExercises)
      console.log('if onAppear workoutdata',exerciseWorkoutData)
    
  }, [refreshKey, editWorkoutData])

  return (
    <>
      <View className="mx-4 my-1">
        {!isNewWorkout ? (
          <UpdateWorkoutsButton
            workoutTitle={workoutTitleText}
            workoutDescription={workoutDescriptionText}
            workoutExercises={exerciseWorkoutData}
            setOnAppear={setOnAppear}
            workoutId={editWorkoutData.id}
            protocolId={protocolEditData.id}
          />
        ) : (
          null
        )}
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
          onPress={async () => {setOnAppear(false); navigation.navigate("ExerciseDataBase")}}
        >
          Add Exercise
        </Button>
      </View>
      <ScrollView className="pb-96">
        {exerciseWorkoutData.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log("exercsie edit widget", index, exercise.exerciseId)
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
