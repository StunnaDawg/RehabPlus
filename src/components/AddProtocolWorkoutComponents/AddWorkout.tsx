import { View } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import SaveWorkoutsToPhaseButton from "./components/SaveWorkouts"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { RouteParamsType } from "../../@types/navigation"
import { NavigationType } from "../../@types/navigation"
import { Workout } from "../../@types/firestore"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"

const AddWorkout = () => {
  const [workoutList, setWorkoutList] = useState<Workout[]>([])
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { completeWorkoutData } = useCompleteWorkoutContext()
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const phaseId = route.params?.phaseId
  const protocolId = newProtocolData.id
  const phaseWorkoutsRef = collection(
    db,
    "protocols",
    protocolId,
    "phases",
    phaseId || currentPhasesId,
    "workouts"
  )
  const isFocused = useIsFocused()

  useEffect(() => {
    setWorkoutList([])
    const setWorkouts = async () => {
      try {
        GetProtocolWorkouts(setWorkoutList, phaseWorkoutsRef)
        console.log("route params id", phaseId)
        console.log("current phase id", currentPhasesId)
        console.log("workout list widget data", completeWorkoutData)
      } catch (err) {
        console.error(err)
      }
    }
    setWorkouts()
  }, [isFocused])

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
        {workoutList?.map((workout, index) => (
          <CompleteWorkoutWidget
            key={index}
            workoutTitle={workout.workout?.title}
            workoutId={workout.id}
          />
        ))}
      </View>
    </>
  )
}

export default AddWorkout
