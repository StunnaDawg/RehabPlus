import { View } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { db, FIREBASE_AUTH } from "../../../../firebase"
import { addDoc, collection } from "firebase/firestore"
import { useNewProtocolDataContext } from "../../../../context/newProtocolContext"
import { useCompleteWorkoutContext } from "../../../../context/completeWorkoutContext"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"

const SaveWorkoutsToPhaseButton = () => {
  const { newProtocolData } = useNewProtocolDataContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { completeWorkoutData } = useCompleteWorkoutContext()
  const newProtocolId = newProtocolData.id
  const phaseCollectionRef = collection(
    db,
    "protocols",
    newProtocolId,
    "phases",
    currentPhasesId,
    "workouts"
  )

  const onSubmitProtocol = async () => {
    try {
      for (const workout of completeWorkoutData) {
        await addDoc(phaseCollectionRef, {
          workout,
          userId: FIREBASE_AUTH?.currentUser?.uid,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitProtocol} icon="pencil">
        Save{" "}
      </Button>
    </View>
  )
}

export default SaveWorkoutsToPhaseButton
