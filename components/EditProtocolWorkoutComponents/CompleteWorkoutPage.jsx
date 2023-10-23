import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

import { useIsFocused } from "@react-navigation/native"

import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useSingleProtocolContext } from "../../context/protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"

const EditWorkoutsPage = ({ id }) => {
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [protocolEditData] = useSingleProtocolContext()
  const [clientWorkouts, setClientWorkouts] = useState([])
  const protocolDocRef = collection(db, "protocols")
  const workoutsSubCollectionRef = collection(
    protocolDocRef,
    protocolEditData.id,
    "workouts"
  )
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useEffect(() => {
    const fetchClientWorkout = async () => {
      await GetProtocolWorkouts(setClientWorkouts, workoutsSubCollectionRef)
    }

    fetchClientWorkout()
  }, [isFocused])

  useEffect(() => {
    console.log("client edit workouts page", clientWorkouts)
  }, [clientWorkouts])

  useEffect(() => {
    console.log("workout userId", protocolEditData.userId)
  }, [])
  return (
    <>
      <View>
        <Button
          onPress={async () => {await setExerciseWorkoutData([]); navigation.navigate("AddNewWorkoutScreen")}}
          icon="plus"
        >
          Add Workout
        </Button>
      </View>

      <View>
        {clientWorkouts.map((widget) => {
          console.log(widget.id)
          return (
            <CompleteWorkoutEditWidget
              key={widget.id}
              workoutTitle={widget.workout.title}
              id={widget.id}
              protocolId={protocolEditData.id}
              userId={protocolEditData.userId}
            />
          )
        })}
      </View>
    </>
  )
}

export default EditWorkoutsPage
