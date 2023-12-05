import { View } from "react-native"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import { Workout, WorkoutExercise } from "../../../../@types/firestore"
import { NavigationType } from "../../../../@types/navigation"

type UpdateWorkoutsButtonProps = {
  workoutTitle?: string
  workoutDescription?: string
  workoutExercises?: WorkoutExercise[]
  workoutId: string
  protocolId: string
  phaseId: string
}

const UpdateWorkoutsButton = ({
  workoutTitle,
  workoutDescription,
  workoutExercises,
  workoutId,
  protocolId,
  phaseId,
}: UpdateWorkoutsButtonProps) => {
  const navigation = useNavigation<NavigationType>()
  const workoutDocRef = doc(
    db,
    "protocols",
    protocolId,
    "phases",
    phaseId,
    "workouts",
    workoutId
  )
  const onSubmitUpdateWorkout = async () => {
    try {
      console.log(workoutDocRef)
      console.log(phaseId)
      console.log("exercises to add to document", workoutExercises)
      const updateData: Workout = {
        id: workoutId,
        workout: {
          title: workoutTitle,
          description: workoutDescription,
          exercises: workoutExercises,
        },
      }
      if (updateData.workout) {
        if (workoutTitle) {
          updateData.workout.title = workoutTitle
        }
        if (workoutDescription) {
          updateData.workout.description = workoutDescription
        }

        if (workoutExercises) {
          updateData.workout.exercises = workoutExercises
        }
      }

      if (Object.keys(updateData).length > 0) {
        // Only update if there's data to update
        await updateDoc(workoutDocRef, updateData)
      }

      navigation.navigate("EditProtocolWorkoutScreen")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitUpdateWorkout} icon="pencil">
        Update Workout
      </Button>
    </View>
  )
}

export default UpdateWorkoutsButton
