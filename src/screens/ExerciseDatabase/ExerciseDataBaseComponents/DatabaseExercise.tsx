import { Button, Modal, Portal, Text } from "react-native-paper"
import React, { useEffect, useState } from "react"
import { useExerciseContext } from "../../../context/exerciseContext"
import "../../../assets/icon.png"
import { useNavigation } from "@react-navigation/native"
import ViewModal from "./ViewModal"
import { NavigationType } from "../../../@types/navigation"
import AddWorkoutModal from "./AddWorkoutModal"
import { Image, View } from "react-native"

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
    console.log("image url for widget", imageUrl)
  }, [])

  return (
    <>
      <View className="flex flex-row mt-3 mx-1 items-center bg-slate-300 p-3 border rounded">
        <View className="flex flex-row items-center">
          <View className="px-1">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </View>
          <View className="flex flex-col mx-2">
            <Text className="font-bold text-center">
              {" "}
              {exerciseName ? exerciseName : "no title"}
            </Text>
            <Button onPress={showModal} textColor="black">
              View
            </Button>
            {exerciseId ? (
              <Button
                textColor="black"
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
            ) : null}
          </View>

          <View className="flex flex-row justify-end">
            <Button
              textColor="black"
              onPress={() => {
                showAddWorkoutModal()
                // console.log("widget pressed")
                // navigation.goBack()
              }}
            >
              Add Workout
            </Button>
          </View>
        </View>
      </View>

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
