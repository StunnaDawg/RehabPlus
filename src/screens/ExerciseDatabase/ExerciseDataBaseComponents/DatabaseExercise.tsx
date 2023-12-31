import { Button, Card, Modal, Portal, Text } from "react-native-paper"
import React, { useEffect, useState } from "react"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useNavigation } from "@react-navigation/native"
import ViewModal from "./ViewModal"
import { NavigationType } from "../../../@types/navigation"
import { WorkoutExercise } from "../../../@types/firestore"
import AddWorkoutModal from "./AddWorkoutModal"
import { Image } from "react-native"

type DatabaseExerciseProps = {
  exerciseName: string
  exerciseId: string
  exerciseDescription?: string
  idOfCategory: string
  imageUrl?: string
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
  exerciseDescription,
  idOfCategory,
  imageUrl,
}: DatabaseExerciseProps) => {
  const [visible, setVisible] = useState(false)
  const [visibleAddWorkout, setVisibleAddWorkout] = useState(false)
  const [exerciseReps, setExerciseReps] = useState<number>(0)
  const [exerciseSets, setExerciseSets] = useState<number>(0)
  const [exerciseCreated, setExerciseCreated] = useState<boolean>(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const showAddWorkoutModal = () => setVisibleAddWorkout(true)
  const hideAddWorkoutModal = () => setVisibleAddWorkout(false)
  const { exerciseData, setExerciseData } = useExerciseContext()
  const navigation = useNavigation<NavigationType>()

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 150,
    marginRight: 40,
    marginLeft: 40,
  }
  const exerciseValues = [
    {
      exercise: {
        id: exerciseId,
        title: exerciseName,
        reps: exerciseReps,
        sets: exerciseSets,
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

  useEffect(() => {
    console.log(imageUrl)
  }, [])

  return (
    <>
      <Card mode="contained" className="mt-3 mx-8 ">
        <Card.Content className="flex-1 flex-row justify-center">
          <Text variant="titleLarge"> {exerciseName}</Text>
          <Card.Actions>
            <Button
              onPress={() => {
                navigation.navigate("EditExercise", {
                  title: exerciseName,
                  exerciseDescription: exerciseDescription,
                  id: exerciseId,
                  categoryId: idOfCategory,
                })
              }}
            >
              Edit Exercise
            </Button>
          </Card.Actions>
        </Card.Content>
        <Card.Content className="flex-1 flex-row">
          {/* <Card.Cover className="w-20 h-20" /> */}
          <Card.Actions className="flex-1 flex-col">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 200, height: 200 }}
              />
            ) : null}
            <Button className="my-1" onPress={showModal}>
              View
            </Button>

            <Button
              onPress={() => {
                showAddWorkoutModal()
                // console.log("widget pressed")
                // navigation.goBack()
              }}
            >
              Add Workout
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={visibleAddWorkout}
          onDismiss={hideAddWorkoutModal}
          contentContainerStyle={containerStyle}
        >
          <AddWorkoutModal
            setExerciseReps={setExerciseReps}
            setExerciseSets={setExerciseSets}
            exerciseId={exerciseId}
            exerciseName={exerciseName}
            categoryId={idOfCategory}
          />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ViewModal
            setVisible={setVisible}
            exerciseTitle={exerciseName}
            exerciseDescription={exerciseDescription}
            exerciseId={exerciseId}
            categoryId={idOfCategory}
          />
        </Modal>
      </Portal>
    </>
  )
}

export default DatabaseExercise
