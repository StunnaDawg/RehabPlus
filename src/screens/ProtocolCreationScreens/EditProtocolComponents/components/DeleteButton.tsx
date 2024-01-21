import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"

type DeleteButtonProps = {
  id: string
  userId: string
}

// We can probably make one delete button component
const DeleteButton = ({ id, userId }: DeleteButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const protocolsCollectionRef = collection(db, "protocols")
  const currentProtocol = doc(protocolsCollectionRef, id)

  const onSubmitProtocol = async () => {
    if (userId == FIREBASE_AUTH?.currentUser?.uid) {
      try {
        await deleteDoc(currentProtocol)
        navigation.navigate("Protocol")
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Button textColor="black" onPress={onSubmitProtocol}>
      Delete Protocol
    </Button>
  )
}

export default DeleteButton
