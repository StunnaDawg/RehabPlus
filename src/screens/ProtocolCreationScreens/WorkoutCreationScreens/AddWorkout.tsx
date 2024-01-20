import { ScrollView, View, RefreshControl, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import GetProtocolWorkouts from "../../../functions/getProtocolWorkouts"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { RouteParamsType } from "../../../@types/navigation"
import { NavigationType } from "../../../@types/navigation"
import { Workout } from "../../../@types/firestore"
import { useCompleteWorkoutContext } from "../../../context/completeWorkoutContext"
import { useCurrentWorkoutIdContext } from "../../../context/workoutIdContext"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useEditWorkoutContext } from "../../../context/editWorkoutContext"

const AddProtocolWorkout = () => {
  const [workoutList, setWorkoutList] = useState<Workout[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { setExerciseData } = useExerciseContext()
  const { completeWorkoutData } = useCompleteWorkoutContext()
  const { setCurrentWorkoutId } = useCurrentWorkoutIdContext()
  const { setEditWorkoutData } = useEditWorkoutContext()
  const navigation = useNavigation<NavigationType>()
  const protocolId = newProtocolData.id
  const phaseWorkoutsRef = collection(
    db,
    "protocols",
    protocolId,
    "phases",
    currentPhasesId,
    "workouts"
  )
  const isFocused = useIsFocused()

  const refreshWorkouts = async () => {
    setWorkoutList([])
    setRefreshing(true)
    console.log("before refresh", workoutList)
    try {
      await GetProtocolWorkouts(setWorkoutList, phaseWorkoutsRef)
      setRefreshing(false)
      console.log("after refresh", workoutList)
    } catch (err) {}
    setRefreshing(false)

    console.log("workout list widget data", completeWorkoutData)
  }

  useEffect(() => {
    refreshWorkouts()
  }, [])

  useEffect(() => {
    refreshWorkouts()
    setExerciseData([])
    setEditWorkoutData({})
  }, [isFocused])

  return (
    <>
      <ScrollView
        className="bg-slate-500"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshWorkouts()}
          />
        }
      >
        <View className="flex-1 flex-row justify-around">
          <Button
            textColor="black"
            onPress={() => navigation.navigate("CreateWorkout")}
            icon="plus"
          >
            Add Workout
          </Button>
        </View>

        {/* <SaveWorkoutsToPhaseButton /> */}

        {workoutList?.length > 0 ? (
          workoutList?.map((workout) => (
            <CompleteWorkoutWidget
              key={workout.id}
              workoutTitle={workout.workout?.title}
              workoutId={workout.id}
            />
          ))
        ) : (
          <View className="flex flex-row justify-center font-bold">
            {refreshing ? (
              <Text className="text-2xl">Refreshing...</Text>
            ) : (
              <Text className="text-2xl">Create A Workout!</Text>
            )}
          </View>
        )}
      </ScrollView>
    </>
  )
}

export default AddProtocolWorkout
