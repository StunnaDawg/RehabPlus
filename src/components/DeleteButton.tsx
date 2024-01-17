import React from "react"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH, db } from "../firebase"
import {
  DocumentReference,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType, NavigationType } from "../@types/navigation"

type DeleteButtonProps = {
  userId?: string
  docRef?: DocumentReference
  navigationLocation: string
  deleteName: string
}

// We can probably make one delete button component
const DeleteButton = ({
  userId,
  docRef,
  navigationLocation,
  deleteName,
}: DeleteButtonProps) => {
  const navigation = useNavigation<TabNavigationType | NavigationType>()

  const onSubmitDoc = async () => {
    if (userId == FIREBASE_AUTH?.currentUser?.uid && docRef != undefined) {
      try {
        await deleteDoc(docRef)
        navigation.navigate(navigationLocation)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Button textColor="black" onPress={onSubmitDoc}>
      {deleteName}
    </Button>
  )
}

export default DeleteButton
