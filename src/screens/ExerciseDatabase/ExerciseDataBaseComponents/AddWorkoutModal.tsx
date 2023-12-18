import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useExerciseContext } from "../../../context/exerciseContext"

type AddWorkoutModalProps = {
  setExerciseReps: Dispatch<SetStateAction<number>>
  setExerciseSets: Dispatch<SetStateAction<number>>
  exerciseName: string
  exerciseId: string
  categoryId: string
}

const AddWorkoutModal = ({
  setExerciseReps,
  setExerciseSets,
  exerciseName,
  exerciseId,
  categoryId,
}: AddWorkoutModalProps) => {
  const navigation = useNavigation()
  const { exerciseData, setExerciseData } = useExerciseContext()
  const [reps, setReps] = useState<number>(0)
  const [sets, setSets] = useState<number>(0)

  const exerciseValues = [
    {
      exercise: {
        id: exerciseId,
        title: exerciseName,
        reps: reps,
        sets: sets,
      },
      categoryId: categoryId,
    },
  ]

  const AddExerciseToWorkoutHandler = () => {
    if (exerciseData) {
      setExerciseData((prevExercises) => [...prevExercises, ...exerciseValues])
    } else {
      setExerciseData([...exerciseValues])
    }
  }
  return (
    <>
      <View>
        <Text>Add Exercise Sets, Reps</Text>
        <TextInput
          label="sets"
          onChange={(sets) => setSets(Number(sets))}
        ></TextInput>
        <TextInput
          label="reps"
          onChange={(reps) => setReps(Number(reps))}
        ></TextInput>
      </View>
      <Button
        onPress={() => {
          AddExerciseToWorkoutHandler()
          navigation.goBack()
        }}
      >
        Add Exercise to Workout
      </Button>
    </>
  )
}

export default AddWorkoutModal
