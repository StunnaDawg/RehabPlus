import { View, Text } from "react-native"
import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

const CreateWorkout = () => {
    const [workoutTitleText, setWorkoutTitleText] = useState('')
    const [workoutDescriptionText, setWorkoutDescriptionText] = useState('')
    const navigation = useNavigation()
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
        <Button icon='dumbbell' onPress={() => navigation.navigate('ExerciseDataBase')}>Add Exercise</Button>
      </View>
    </>
  )
}

export default CreateWorkout
