import { Button, Card, Modal, Portal, Text } from "react-native-paper"
import React, { useEffect, useState } from "react"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useNavigation } from "@react-navigation/native"
import ViewModal from "./ViewModal"

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
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const { exerciseData, setExerciseData } = useExerciseContext()
  const navigation = useNavigation()

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 150,
  }
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
    <>
      <Card mode="contained" className="mt-3 mx-8 ">
        <Card.Content className="flex-1 flex-row justify-center">
          <Text variant="titleLarge"> {exerciseName}</Text>
        </Card.Content>
        <Card.Content className="flex-1 flex-row">
          {/* <Card.Cover className="w-20 h-20" /> */}
          <Card.Actions className="flex-1 flex-col">
            <Button className="my-1" onPress={showModal}>
              View
            </Button>

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

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ViewModal setVisible={setVisible} exerciseId={exerciseId} />
        </Modal>
      </Portal>
    </>
  )
}

export default DatabaseExercise
