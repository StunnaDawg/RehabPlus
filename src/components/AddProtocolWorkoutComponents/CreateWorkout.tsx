import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import ExerciseWidget from "./ExerciseWidget"
import CreateWorkoutButton from "./CreateWorkoutButton"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useRefreshContext } from "../../context/refreshKey"

const CreateWorkout = () => {
  const [workoutTitleText, setWorkoutTitleText] = useState("")
  const [refreshKey, setRefreshKey] = useRefreshContext()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState("")
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [exerciseMap, setExerciseMap] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()
const exercises = exerciseWorkoutData
  useEffect(() => {
    const awaitLoading = async () => {
    setExerciseMap(exercises)
    console.log('widget map', exerciseMap)
    }
    awaitLoading()
    
  }, [isFocused])

  useEffect(() => {
    setExerciseMap(exerciseWorkoutData)
  }, [exerciseWorkoutData, refreshKey])

  return (
    <>
    <View className="mx-4 my-1">
        <CreateWorkoutButton title={workoutTitleText} description={workoutDescriptionText} exercises={exerciseWorkoutData} />
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
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        const letterData = letters[index % letters.length];

        console.log(index, exercise.exerciseId)
        return (
        <ExerciseWidget key={exercise.exerciseId} id={exercise.exerciseId} categoryId={exercise.categoryId} letter={letterData} index={index+1}/>
        )
    })}
      </ScrollView>
    </>
  )
}

export default CreateWorkout
