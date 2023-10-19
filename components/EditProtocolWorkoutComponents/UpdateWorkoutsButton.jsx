import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useWorkoutContext } from "../../addWorkoutProtocol"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"
import { useSingleWorkoutContext } from "../../workoutContext"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

const UpdateWorkoutsButton = ({workoutTitle, workoutDescription, workoutExercises, setOnAppear, workoutId, protocolId}) => {
  const navigation = useNavigation()
  const workoutDocRef = doc(db, "protocols", protocolId, 'workouts', workoutId)
  const onSubmitUpdateWorkout = async () => {
      try{
console.log(workoutDocRef)
console.log("exercises to add to document", workoutExercises)
const updateData = {};
if (workoutTitle) {
    updateData["workout.title"] = workoutTitle;
}
if (workoutDescription) {
    updateData["workout.description"] = workoutDescription;
}

if (workoutExercises) {
  updateData["workout.exercises"] = workoutExercises;
}


if (Object.keys(updateData).length > 0) { // Only update if there's data to update
    await updateDoc(workoutDocRef, updateData);
}

      navigation.navigate("EditProtocolWorkoutScreen")
  } catch(err) {
      console.error(err)
  }
  }
return (
  <View>
    <Button onPress={onSubmitUpdateWorkout} icon='pencil'>Update Workout</Button>
  </View>
)
}

export default UpdateWorkoutsButton
