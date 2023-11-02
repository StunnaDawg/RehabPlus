import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"

import { useIsFocused } from "@react-navigation/native"

import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useSingleProtocolContext } from "../../context/protocolContext"
import { collection, doc } from "firebase/firestore"
import { db } from "../../firebase"
import GetProtocolPhases from "../../functions/gteProtocolPhases"
import { useRefreshContext } from "../../context/refreshKey"
import { useCurrentPhasesContext } from "../../context/phasesAddContext"

const EditWorkoutsPage = () => {
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  const [protocolEditData] = useSingleProtocolContext()
  const [clientWorkouts, setClientWorkouts] = useState([])
  const [refreshKey, setRefreshKey] = useRefreshContext()
  const route = useRoute()
  const currentProtocolRef = collection(db, "protocols")
  const currentProtocol = doc(currentProtocolRef, protocolEditData.id)
  const currentProtocolPhase = doc(currentProtocol, "phases", currentPhasesData)
  const currentPhaseWorkouts = collection(currentProtocolPhase, "workouts")
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useEffect(() => {
    const fetchClientWorkout = async () => {
      await GetProtocolPhases(setClientWorkouts, setRefreshKey, currentPhaseWorkouts)
    }

    fetchClientWorkout()
  }, [isFocused])

  useEffect(() => { 
    console.log('phase id', currentPhasesData)
  }, [])
  useEffect(() => {
    console.log("client edit workouts page", clientWorkouts)
  }, [clientWorkouts])
  return (
    <>
      <View>
        <Button
          onPress={async () => {
            await setExerciseWorkoutData([])
            navigation.navigate("AddNewWorkoutScreen")
          }}
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
