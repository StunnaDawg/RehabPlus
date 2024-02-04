import { View } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { TabNavigationType } from "../../../../@types/navigation"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"

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

  const onSubmitClient = async () => {
    try {
      const password = "123122"
      const auth = FIREBASE_AUTH

      const newClientData = {
        name: clientName,
        injuryDescription: clientOutline,
        status: active,
        email: clientEmail,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        protocol: protocolId || null,
      }

      await createUserWithEmailAndPassword(auth, clientEmail, password)

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser)
        await addDoc(clientsCollectionRef, newClientData)
      } else {
        console.log("auth failure")
      }

      navigation.navigate("Client")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View>
      <Button textColor="black" onPress={onSubmitClient}>
        {" "}
        Create Client{" "}
      </Button>
    </View>
  )
}

export default CreateButton
