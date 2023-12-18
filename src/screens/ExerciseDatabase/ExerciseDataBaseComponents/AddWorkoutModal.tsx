import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

type AddWorkoutModalProps = {
  setExerciseReps: Dispatch<SetStateAction<number>>
  setExerciseSets: Dispatch<SetStateAction<number>>
  setExerciseIsCreated: Dispatch<SetStateAction<boolean>>
}

const AddWorkoutModal = ({
  setExerciseReps,
  setExerciseSets,
  setExerciseIsCreated,
}: AddWorkoutModalProps) => {
  const navigation = useNavigation()
  return (
    <>
      <View>
        <Text>Add Exercise Sets, Reps</Text>
        <TextInput
          label="sets"
          onChange={(sets) => setExerciseSets(Number(sets))}
        ></TextInput>
        <TextInput
          label="reps"
          onChange={(reps) => setExerciseReps(Number(reps))}
        ></TextInput>
      </View>
      <Button
        onPress={() => {
          setExerciseIsCreated(true)
          //   navigation.goBack()
        }}
      >
        Add Exercise to Workout
      </Button>
    </>
  )
}

export default AddWorkoutModal
