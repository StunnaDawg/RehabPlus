import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../workoutContext"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useSingleEditWorkoutContext } from "../../editWorkoutContext"
import { useIsFocused } from "@react-navigation/native"

const EditWorkout = () => {
  const [editWorkoutData, setEditWorkoutData] = useSingleEditWorkoutContext([])
  const [workoutTitleText, setWorkoutTitleText] = useState('')
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState('')
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  let defaultWorkoutTitle = editWorkoutData.workout.title
  let defaultWorkoutDescription = editWorkoutData.workout.description

  useEffect(() => {
        console.log('workout to be edited', editWorkoutData.workout)

  }, [isFocused])

  return (
    <>
    {/* <View className="mx-4 my-1">
        <CreateWorkoutButton title={workoutTitleText} description={workoutDescriptionText} exercises={exerciseWorkoutData} />
      </View> */}
      <View className="mx-4 my-1">
        <Text>Workout Title</Text>
        <TextInput
          mode="outlined"
          defaultValue={defaultWorkoutTitle !== null ? defaultWorkoutTitle : 'loading...' }
          onChangeText={(text) => setWorkoutTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Workout Description</Text>
        <TextInput
          mode="outlined"
          defaultValue={defaultWorkoutDescription !== null ? defaultWorkoutDescription : 'loading...' }
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
      {/* <ScrollView className="pb-96">
      {exerciseWorkoutData.map((exercise, index) => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        const letterData = letters[index % letters.length];

        console.log(index, exercise.exerciseId)
        return (
        <ExerciseWidget key={exercise.exerciseId} id={exercise.exerciseId} categoryId={exercise.categoryId} letter={letterData} index={index+1}/>
        )
    })}
      </ScrollView> */}
    </>
  )
}

export default EditWorkout
