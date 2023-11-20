import { View } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import SaveWorkoutsToPhaseButton from "./components/CreateProtocolButton"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { RouteParamsType } from "../../@types/navigation"
import { NavigationType } from "../../@types/navigation"
import { Workout } from "../../@types/firestore"

const AddWorkout = () => {
  const [workoutList, setWorkoutList] = useState<Workout[]>([])
  const {newProtocolData} = useNewProtocolDataContext()
  const {currentPhasesId} = useCurrentPhasesIdContext()
  const navigation = useNavigation<NavigationType>()
  const route =  useRoute<RouteProp<Record<string, RouteParamsType>, string>>();
  const phaseId = route.params.phaseId
  const protocolId = newProtocolData.id
  const phaseWorkoutsRef = collection(
    db,
    "protocols",
    protocolId,
    "phases",
    phaseId || currentPhasesId,
    "workouts"
  )

  useEffect(() => {
    GetProtocolWorkouts(setWorkoutList, phaseWorkoutsRef)
    console.log("route params id", phaseId)
    console.log("current phase id", currentPhasesId)
  }, [])

  return (
    <>
      <View className="flex-1 flex-row justify-around">
        <Button
          onPress={() => navigation.navigate("CreateWorkout")}
          icon="plus"
        >
          Add Workout
        </Button>
        <SaveWorkoutsToPhaseButton />
      </View>

      <View>
        {workoutList?.map((workout) => (
          <CompleteWorkoutWidget key={workout.id} workoutTitle={workout.workout?.title} />
        ))}
      </View>
    </>
  )
}

export default AddWorkout
