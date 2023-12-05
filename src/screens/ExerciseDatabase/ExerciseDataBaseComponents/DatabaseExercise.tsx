import { Button, Card, Text } from "react-native-paper"
import React, { useEffect } from "react"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useNavigation } from "@react-navigation/native"

type DatabaseExerciseProps = {
  exerciseName: string
  exerciseId: string
  idOfCategory: string
}

// export type WorkoutExercise = {
//   title: string
//   description?: string
//   categoryId: string
//   exercise: ExerciseDataBaseExercise
//   reps?: string
//   sets?: string
// }
const DatabaseExercise = ({
  exerciseName,
  exerciseId,
  idOfCategory,
}: DatabaseExerciseProps) => {
  const { exerciseData, setExerciseData } = useExerciseContext()
  const navigation = useNavigation()
  const exerciseValues = [
    {
      exercise: {
        id: exerciseId,
        title: exerciseName,
      },
      categoryId: idOfCategory,
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
    <Card mode="contained" className="mt-3 mx-8 ">
      <Card.Content className="flex-1 flex-row justify-center">
        <Text variant="titleLarge"> {exerciseName}</Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        {/* <Card.Cover className="w-20 h-20" /> */}
        <Card.Actions className="flex-1 flex-col">
          <Button className="my-1">View</Button>
          <Button
            onPress={() => {
              AddExerciseToWorkoutHandler()
              console.log("widget pressed")
              navigation.goBack()
            }}
          >
            Add Workout
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default DatabaseExercise
