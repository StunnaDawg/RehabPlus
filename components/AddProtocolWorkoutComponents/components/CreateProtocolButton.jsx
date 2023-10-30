import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { db, FIREBASE_AUTH } from "../../../firebase"
import { addDoc, collection, doc } from "firebase/firestore"
import { useNewProtocolContext } from "../../../context/newProtocolContext"
import { useCompleteWorkoutContext } from "../../../context/completeWorkoutContext"

const SaveWorkoutsToPhaseButton = ({ phaseId }) => {
  const [newProtocolData, setNewProtocol] = useNewProtocolContext()
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const navigation = useNavigation()
  const phaseCollectionRef = collection(
    db,
    "protocols",
    newProtocolData.id,
    "phases"
  )
  const workoutsSubCollectionRef = collection(
    phaseCollectionRef,
    phaseId,
    "workouts"
  )

  const onSubmitProtocol = async () => {
    try {
      for (const workout of completeWorkoutData) {
        await addDoc(workoutsSubCollectionRef, {
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
