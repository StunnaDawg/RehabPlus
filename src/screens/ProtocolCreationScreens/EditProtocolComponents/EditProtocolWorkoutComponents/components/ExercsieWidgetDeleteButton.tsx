import { Alert } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useRefreshKeyContext } from "../../../../../context/refreshKey"
import { WorkoutExercise } from "../../../../../@types/firestore"

type ExerciseWidgetDeleteButtonProps = {
  workoutId: string
  protocolId: string
  exerciseId: string
  userId: string
  phaseId: string
}
const ExerciseWidgetDeleteButton = ({
  workoutId,
  protocolId,
  exerciseId,
  userId,
  phaseId,
}: ExerciseWidgetDeleteButtonProps) => {
  const { refreshKey, setRefreshKey } = useRefreshKeyContext()
  const protocolRef = doc(db, "protocols", protocolId)
  const currentWorkout = doc(
    protocolRef,
    "phases",
    phaseId,
    "workouts",
    workoutId
  )

  const DeleteExerciseButton = () =>
    Alert.alert("Warning", "Are you sure you want to delete this exercise?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          if (userId === FIREBASE_AUTH?.currentUser?.uid) {
            console.log("before set", refreshKey)
            try {
              console.log("Delete pressed")

              const workoutDoc = await getDoc(currentWorkout)

              if (workoutDoc.exists()) {
                // Extract the exercises array
                const exercises = workoutDoc.data().workout.exercises || []

                // Find the index of the exercise to be deleted using its exerciseId
                const exerciseIndex = exercises.findIndex(
                  (ex: WorkoutExercise) => ex.exerciseId === exerciseId
                )

                // If the exercise is found, remove it from the array
                if (exerciseIndex !== -1) {
                  exercises.splice(exerciseIndex, 1)
                }

                // Update the workout document with the modified exercises array
                await updateDoc(currentWorkout, {
                  "workout.exercises": exercises,
                })
                setRefreshKey(!refreshKey)
                console.log("after set", refreshKey)
              }
            } catch (err) {
              console.error(err)
            }
          }
        },
        style: "destructive",
      },
    ])

  return <Button onPress={DeleteExerciseButton}>Delete</Button>
}

export default ExerciseWidgetDeleteButton
