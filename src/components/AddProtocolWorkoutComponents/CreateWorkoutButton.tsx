import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { Workout } from "../../@types/firestore"
import { useExerciseContext } from "../../context/exerciseContext"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../firebase"
import { addDoc, collection } from "firebase/firestore"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"

const CreateWorkoutButton = ({
  workout: { title, description, exercises } = {},
}: Workout) => {
  const { setExerciseData } = useExerciseContext()
  const { completeWorkoutData, setCompleteWorkoutData } =
    useCompleteWorkoutContext()
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const newProtocolId = newProtocolData.id
  const phaseCollectionRef = collection(
    db,
    "protocols",
    newProtocolId,
    "phases",
    currentPhasesId,
    "workouts"
  )
  const navigation = useNavigation<NavigationType>()

  const CreateWorkout = async () => {
    setCompleteWorkoutData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      { workout: { title, description, exercises } },
    ])
    setExerciseData([])

    try {
      for (const workout of completeWorkoutData) {
        await addDoc(phaseCollectionRef, {
          workout,
          userId: FIREBASE_AUTH?.currentUser?.uid,
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
        await CreateWorkout()
        navigation.navigate("AddProtocolWorkoutScreen")
      }}
    >
      Create Workout
    </Button>
  )
}
export default CreateWorkoutButton
