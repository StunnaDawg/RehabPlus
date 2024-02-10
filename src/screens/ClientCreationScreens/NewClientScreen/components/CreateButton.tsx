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
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
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
      // const password = "123122"
      // const auth = FIREBASE_AUTH

      // // Create a new user without automatically signing in
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   clientEmail,
      //   password
      // )

      // // Get the user after creating the account
      // const user = userCredential.user

      // Send verification email
      // await sendSignInLinkToEmail(FIREBASE_AUTH, clientEmail, window.location.href)

      const newClientData = {
        name: clientName,
        injuryDescription: clientOutline,
        status: active,
        email: clientEmail,
        physician: FIREBASE_AUTH?.currentUser?.uid, // Use the UID from the newly created user
        protocol: protocolId || null,
      }

      // Add the new client data
      await addDoc(clientsCollectionRef, newClientData)

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
