import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { Workout } from "../../@types/firestore"
import { useExerciseContext } from "../../context/exerciseContext"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../firebase"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { useCurrentWorkoutIdContext } from "../../context/workoutIdContext"

const UpdateWorkoutButton = ({
  workout: { title, description, exercises } = {},
}: Workout) => {
  const { setExerciseData } = useExerciseContext()
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { currentWorkoutId } = useCurrentWorkoutIdContext()
  const newProtocolId = newProtocolData.id
  const workoutId = currentWorkoutId
  const workoutDocRef = doc(
    db,
    "protocols",
    newProtocolId,
    "phases",
    currentPhasesId,
    "workouts",
    workoutId
  )
  const navigation = useNavigation<NavigationType>()

  const CreateWorkout = async () => {
    setExerciseData([])

    try {
      await updateDoc(workoutDocRef, {
        workout: {
          title: title,
          description: description,
          exercises: exercises,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Button
      icon="plus"
      onPress={async () => {
        await CreateWorkout()
        navigation.navigate("AddProtocolWorkoutScreen")
      }}
    >
      Update Workout
    </Button>
  )
}
export default UpdateWorkoutButton
