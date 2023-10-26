import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

import CompleteWorkoutWidget from "./components/CompleteWorkoutWIdget"
import { useIsFocused } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"

const AddWorkout = ({protocolTitle, protocolOutline, protocolPublic, protocolPhases, phaseId}) => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
    const protocolsCollectionRef = collection(db, "protocols")
  const navigation = useNavigation()
  const onSubmitProtocol = async () => {
    try{
    const protocolDocRef = await addDoc(protocolsCollectionRef, {
        title: protocolTitle,
        description: protocolOutline,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        public: protocolPublic
    })

      const phasesSubCollectionRef = collection(protocolDocRef, 'phases');
    console.log(protocolPhases)

    for (const phases of protocolPhases) {
      await addDoc(phasesSubCollectionRef,{
        phases,
        userId: FIREBASE_AUTH?.currentUser?.uid,
      } );
  }
} catch(err) {
      console.error(err)
  }
  return (
    <>
      <View>
        <Button
          onPress={async () => {await onSubmitProtocol(); navigation.navigate("CreateWorkout")}}
          icon="plus"
        >
          Add Workout
        </Button>
      </View>

      <View>
      {completeWorkoutData.map((workout, index) => (
    <CompleteWorkoutWidget key={index} workoutTitle={workout.title} />
  ))}
      </View>
    </>
  )
}
}

export default AddWorkout
