import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"

type DeleteClientProps = {
  id: string
  userId: string
}

const DeleteButton = ({ id, userId }: DeleteClientProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const clientsCollectionRef = collection(db, "clients")

  const onSubmitProtocol = async () => {
    if ((userId == FIREBASE_AUTH?.currentUser?.uid && id != null) || "") {
      const currentProtocol = doc(clientsCollectionRef, id)
      try {
        await deleteDoc(currentProtocol)
        navigation.navigate("Client")
      } catch (err) {
        console.error(err)
      }
    }
  }

  return <Button onPress={onSubmitProtocol}>Delete Protocol</Button>
}

export default DeleteButton
