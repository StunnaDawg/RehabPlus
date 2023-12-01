import { ScrollView, Text, View, RefreshControl } from "react-native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Button } from "react-native-paper"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import { useNewProtocolDataContext } from "../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../context/phasesIdContext"
import { RouteParamsType } from "../../@types/navigation"
import { NavigationType } from "../../@types/navigation"
import { Workout } from "../../@types/firestore"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"

const AddWorkout = () => {
  const [workoutList, setWorkoutList] = useState<Workout[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(true)
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

  const refreshWorkouts = async () => {
    setRefreshing(true)
    console.log("refreshing")
    setWorkoutList([])
    await GetProtocolWorkouts(setWorkoutList, phaseWorkoutsRef)
    setRefreshing(false)
    console.log("workout list widget data", completeWorkoutData)
  }

  useEffect(() => {
    refreshWorkouts()
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
      </View>
      {refreshing ? <ActivityIndicator /> : null}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshWorkouts} />
        }
      >
        {/* <SaveWorkoutsToPhaseButton /> */}

        <View>
          {workoutList?.map((workout, index) => (
            <CompleteWorkoutWidget
              key={index}
              workoutTitle={workout.workout?.title}
              workoutId={workout.id}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default AddWorkout
