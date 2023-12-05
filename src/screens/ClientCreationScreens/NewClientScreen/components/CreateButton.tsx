import { View } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { DocumentReference, addDoc, collection, doc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { TabNavigationType } from "../../../../@types/navigation"

type CreateButtonProps = {
  clientName: string
  clientOutline: string
  active: boolean
  clientEmail: string
  protocolId: string
}

const CreateButton = ({
  clientName,
  clientOutline,
  active,
  clientEmail,
  protocolId,
}: CreateButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const clientsCollectionRef = collection(db, "clients")
  let protocolRef: DocumentReference | null
  if (protocolId !== "") {
    protocolRef = doc(db, "protocols", protocolId)
  }
  const onSubmitClient = async () => {
    try {
      const newClientData = {
        name: clientName,
        injuryDescription: clientOutline,
        status: active,
        email: clientEmail,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        protocol: protocolRef ? protocolRef : null,
      }

      await addDoc(clientsCollectionRef, newClientData)
      navigation.navigate("Client")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitClient}> Create Client </Button>
    </View>
  )
}

export default CreateButton
