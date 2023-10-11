import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../workoutContext"
import ExerciseWidget from "./WorkoutWidget"

const CreateWorkout = () => {
  const [workoutTitleText, setWorkoutTitleText] = useState("")
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState("")
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const navigation = useNavigation()

  useEffect(() => {
console.log('workout WIdget page:', exerciseWorkoutData)
  }, [exerciseWorkoutData])
  return (
    <>
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
      <ScrollView className='pb-96'>
        {exerciseWorkoutData.map((exercise) => {
            <ExerciseWidget exerciseName={'yo'} id={exercise} />
        })}
      </ScrollView>

     
    </>
  )
}

export default CreateWorkout
