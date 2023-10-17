import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"

import { useIsFocused } from "@react-navigation/native"

import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useSingleProtocolContext } from "../../protocolContext"

const EditWorkoutsPage = ({ id }) => {
  const [protocolEditData] = useSingleProtocolContext()
  const [clientWorkouts, setClientWorkouts] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  // useEffect(() => {
  //   const fetchClientWorkout = async () => {
  //     await GetProtocolWorkouts()
  //   }

  //   fetchClientWorkout()
  // }, [isFocused])

  useEffect(() => {
    console.log('protocol id',  protocolEditData.id)
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
