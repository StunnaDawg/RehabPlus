import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"

import { useIsFocused } from "@react-navigation/native"

import CompleteWorkoutEditWidget from "./components/CompleteWorkoutEditWIdget"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useSingleEditProtocolContext } from "../../context/protocolContext"
import { collection, doc } from "firebase/firestore"
import { db } from "../../firebase"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { Workout } from "../../@types/firestore"
import { NavigationType } from "../../@types/navigation"
import GetWorkouts from "../../functions/getWorkouts"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"

const EditWorkoutsPage = () => {
  const { setWorkoutData} = useSingleWorkoutContext()
  const {currentPhasesId} = useCurrentPhasesIdContext()
  const {protocolEditData} = useSingleEditProtocolContext()
  const [clientWorkouts, setClientWorkouts] = useState<Workout[]>([])
  const currentProtocolRef = collection(db, "protocols")
  const currentProtocol = doc(currentProtocolRef, protocolEditData.id)
  const currentProtocolPhase = doc(currentProtocol, "phases", currentPhasesId)
  const currentPhaseWorkouts = collection(currentProtocolPhase, "workouts")
  const navigation = useNavigation<NavigationType>()
  const isFocused = useIsFocused()
  useEffect(() => {
    const fetchClientWorkout = async () => {
      await GetProtocolWorkouts(setClientWorkouts, currentPhaseWorkouts)
    }

    fetchClientWorkout()
  }, [isFocused])

  useEffect(() => { 
    console.log('phase id', currentPhasesId)
  }, [])
  useEffect(() => {
    console.log("client edit workouts page", clientWorkouts)
  }, [clientWorkouts])
  return (
    <>
      <View>
        <Button
          onPress={async () => {
             setWorkoutData({})
            navigation.navigate("AddNewWorkoutScreen")
          }}
          icon="plus"
        >
          Add Workout
        </Button>
      </View>

      <View>
        {clientWorkouts?.map((widget) => {
          console.log(widget.workout)
          if(widget.id === undefined) return (<Text>No Workouts Saved</Text>)
          return (
            <CompleteWorkoutEditWidget
              key={widget.id}
              workoutTitle={widget.workout?.title}
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
