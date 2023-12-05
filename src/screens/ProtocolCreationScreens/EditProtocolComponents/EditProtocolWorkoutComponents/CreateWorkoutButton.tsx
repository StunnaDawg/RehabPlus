import { View } from "react-native"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { Workout, WorkoutExercise } from "../../../../@types/firestore"
import { NavigationType } from "../../../../@types/navigation"

type AddWorkoutButtonProps = {
  workoutTitle?: string
  workoutDescription?: string
  workoutExercises?: WorkoutExercise[]
  protocolId: string
  phaseId: string
}

const AddWorkoutButton = ({
  workoutTitle,
  workoutDescription,
  workoutExercises,
  protocolId,
  phaseId,
}: AddWorkoutButtonProps) => {
  const navigation = useNavigation<NavigationType>()
  const workoutCollectionRef = collection(
    db,
    "protocols",
    protocolId,
    "phases",
    phaseId,
    "workouts"
  )
  const onSubmitAddWorkout = async () => {
    try {
      const newWorkoutData: Workout = {
        workout: {
          title: workoutTitle,
          description: workoutDescription,
          exercises: workoutExercises,
        },
      }
      if (newWorkoutData.workout) {
        if (workoutTitle) {
          newWorkoutData.workout.title = workoutTitle
        }
        if (workoutDescription) {
          newWorkoutData.workout.description = workoutDescription
        }

        if (workoutExercises) {
          newWorkoutData.workout.exercises = workoutExercises
        }
      }

      if (Object.keys(newWorkoutData).length > 0) {
        console.log(newWorkoutData)
        await addDoc(workoutCollectionRef, {
          workout: newWorkoutData,
          userId: FIREBASE_AUTH?.currentUser?.uid,
        })
      }

      navigation.navigate("EditProtocolWorkoutScreen")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitAddWorkout} icon="plus">
        Add Workout
      </Button>
    </View>
  )
}

export default AddWorkoutButton
