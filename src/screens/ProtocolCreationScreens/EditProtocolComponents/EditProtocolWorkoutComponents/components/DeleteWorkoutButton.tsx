import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"

type DeleteWorkoutButtonProps = {
  id: string
  userId: string
  protocolId: string
  phaseId: string
}

const DeleteWorkoutButton = ({
  id,
  userId,
  protocolId,
  phaseId,
}: DeleteWorkoutButtonProps) => {
  const navigation = useNavigation()
  const protocolRef = doc(db, "protocols", protocolId)
  const currentWorkoutToDelete = doc(
    protocolRef,
    "phases",
    phaseId,
    "workouts",
    id
  )

  const onSubmitWorkout = async () => {
    if (userId === FIREBASE_AUTH?.currentUser?.uid) {
      try {
        console.log("hello")
        await deleteDoc(currentWorkoutToDelete)
        navigation.goBack()
      } catch (err) {
        console.error(err)
      }
    }
  }

  return <Button icon="delete" onPress={onSubmitWorkout}></Button>
}

export default DeleteWorkoutButton
