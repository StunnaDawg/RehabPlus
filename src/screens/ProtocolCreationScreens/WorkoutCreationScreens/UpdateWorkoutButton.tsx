import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../../context/completeWorkoutContext"
import { Workout } from "../../../@types/firestore"
import { useExerciseContext } from "../../../context/exerciseContext"
import { NavigationType } from "../../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { useCurrentWorkoutIdContext } from "../../../context/workoutIdContext"

const UpdateWorkoutButton = ({
  workout: { title, description, exercises } = {},
}: Workout) => {
  const { setExerciseData } = useExerciseContext()
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { currentWorkoutId } = useCurrentWorkoutIdContext()
  const newProtocolId = newProtocolData.id
  console.log(currentWorkoutId)

  const navigation = useNavigation<NavigationType>()

  const UpdateWorkout = async () => {
    setExerciseData([])
    console.log("id is right here", currentWorkoutId)
    console.log("trying to update")
    try {
      if (currentWorkoutId) {
        console.log("there is an id")
        const workoutDocRef = doc(
          db,
          "protocols",
          newProtocolId,
          "phases",
          currentPhasesId,
          "workouts",
          currentWorkoutId
        )
        await updateDoc(workoutDocRef, {
          workout: {
            title: title,
            description: description,
            exercises: exercises,
          },
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Button
      icon="plus"
      onPress={async () => {
        await UpdateWorkout()
        navigation.navigate("AddProtocolWorkoutScreen")
      }}
    >
      Update Workout
    </Button>
  )
}
export default UpdateWorkoutButton
