import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { addDoc, collection, doc, setLogLevel, LogLevel } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const AddWorkoutButton = ({
  workoutTitle,
  workoutDescription,
  workoutExercises,
  protocolId,
  phaseId,
}) => {
  const navigation = useNavigation()
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
      const newWorkoutData = {}
      if (workoutTitle) {
        newWorkoutData["title"] = workoutTitle
      }
      if (workoutDescription) {
        newWorkoutData["description"] = workoutDescription
      }

      if (workoutExercises) {
        newWorkoutData["exercises"] = workoutExercises
      }

      if (Object.keys(newWorkoutData).length > 0) {
        console.log(newWorkoutData)
        await addDoc(workoutCollectionRef,  {workout: newWorkoutData,
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
