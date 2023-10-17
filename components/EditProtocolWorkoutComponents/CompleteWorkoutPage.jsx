import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"

import { useIsFocused } from "@react-navigation/native"

import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useSingleProtocolContext } from "../../protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"

const EditWorkoutsPage = ({ id }) => {
  const [protocolEditData] = useSingleProtocolContext()
  const [clientWorkouts, setClientWorkouts] = useState([])
  const protocolDocRef = collection(db, "protocols")
  const workoutsSubCollectionRef = collection(protocolDocRef, protocolEditData.id, 'workouts');
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  // useEffect(() => {
  //   const fetchClientWorkout = async () => {
  //     await GetProtocolWorkouts(setClientWorkouts, workoutsSubCollectionRef)
  //   }

  //   fetchClientWorkout()
  // }, [isFocused])

  useEffect(() => {
    console.log('workouts',  workoutsSubCollectionRef)
  }, [])
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.navigate("CreateWorkout")}
          icon="plus"
        >
          Add Workout
        </Button>
      </View>

      <View>
        {clientWorkouts.map((workout, index) => (
          <CompleteWorkoutEditWidget key={index} workoutTitle={workout.title} />
        ))}
      </View>
    </>
  )
}

export default EditWorkoutsPage
