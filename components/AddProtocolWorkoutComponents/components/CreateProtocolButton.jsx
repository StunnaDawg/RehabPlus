import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { db, FIREBASE_AUTH } from "../../../firebase"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { useNewProtocolContext } from "../../../context/newProtocolContext"
import { useCompleteWorkoutContext } from "../../../context/completeWorkoutContext"
import { useCurrentPhasesContext } from "../../../context/phasesAddContext"

const SaveWorkoutsToPhaseButton = () => {
  const [newProtocolData, setNewProtocol] = useNewProtocolContext()
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const navigation = useNavigation()
  const phaseCollectionRef = doc(
    db,
    "protocols",
    newProtocolData.id,
    "phases",
    currentPhasesData
  )

  const onSubmitProtocol = async () => {
    try {
      for (const workout of completeWorkoutData) {
        await addDoc(phaseCollectionRef, {
          'workouts':
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
