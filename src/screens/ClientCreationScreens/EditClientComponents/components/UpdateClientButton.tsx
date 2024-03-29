import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import {
  updateDoc,
  collection,
  doc,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore"
import { TabNavigationType } from "../../../../@types/navigation"

type UpdateClientButtonProps = {
  clientName: string
  clientInjuryDescription: string
  clientEmail: string
  id: string
  userId: string
  protocolId: string
}

const UpdateClientButton = ({
  clientName,
  clientInjuryDescription,
  clientEmail,
  id,
  userId,
  protocolId,
}: UpdateClientButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const clientsCollectionRef = collection(db, "clients")

  const onSubmitProtocol = async () => {
    console.log(
      " client userId:",
      userId,
      "current userId:",
      FIREBASE_AUTH?.currentUser?.uid
    )
    if ((userId == FIREBASE_AUTH?.currentUser?.uid && id !== null) || "") {
      const currentClient = doc(clientsCollectionRef, id)
      try {
        await updateDoc(currentClient, {
          name: clientName,
          injuryDescription: clientInjuryDescription,
          email: clientEmail,
          protocol: protocolId,
        })
        navigation.navigate("Client")
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log("error with Auth")
    }
  }
  return (
    <View>
      <Button textColor="black" onPress={onSubmitProtocol}>
        Update Client Info
      </Button>
    </View>
  )
}

export default UpdateClientButton
