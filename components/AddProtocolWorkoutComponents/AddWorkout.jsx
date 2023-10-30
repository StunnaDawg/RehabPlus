import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"

import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { useIsFocused } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { useRefreshContext } from "../../context/refreshKey"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import SaveWorkoutsToPhaseButton from "./components/CreateProtocolButton"
import GetProtocolPhases from "../../functions/gteProtocolPhases"
import { useNewProtocolContext } from "../../context/newProtocolContext"
import { useCurrentPhasesContext } from "../../context/phasesAddContext"

const AddWorkout = () => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
    const [refreshKey, setRefreshKey] = useRefreshContext()
    const [newProtocolData, setNewProtocol] = useNewProtocolContext()
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  const navigation = useNavigation()
  const route = useRoute()
  const phaseId = route.params?.phaseId
  const phaseWorkoutsRef = collection(db, 'protocols', newProtocolData.id, 'phases', phaseId || currentPhasesData, 'workouts')

  useEffect(() => {
    if (currentPhasesData === '') {
      setCurrentPhasesData(phaseId)
    }
    
GetProtocolPhases(setCompleteWorkoutData, setRefreshKey, phaseWorkoutsRef)
console.log('route params id', phaseId)
console.log('current phase id', currentPhasesData)
  }, [])
  return (
    <>
      <View className='flex-1 flex-row justify-around'>
        <Button
          onPress={ () => navigation.navigate("CreateWorkout")}
          icon="plus"
        >
          Add Workout
        </Button>
        <SaveWorkoutsToPhaseButton phaseId={phaseId || currentPhasesData} />
      </View>

      <View>
      {completeWorkoutData.map((workout, index) => (
    <CompleteWorkoutWidget key={index} workoutTitle={workout.title} />
  ))}
      </View>
    </>
  )
}

export default AddWorkout
