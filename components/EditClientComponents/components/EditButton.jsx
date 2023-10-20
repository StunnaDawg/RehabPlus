import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { updateDoc, collection, doc } from "firebase/firestore"

const UpdateClientButton = ({
  clientName,
  clientInjuryDescription,
  clientEmail,
  id,
  userId,
  protocolId
}) => {
  const navigation = useNavigation()
  const clientsCollectionRef = collection(db, "clients")
  const currentClient = doc(clientsCollectionRef, id)
  let protocolRef = null
  if (protocolId) {
    protocolRef = doc(db, "protocols", protocolId);
  }
  const onSubmitProtocol = async () => {
    console.log(' client userId:', userId, 'current userId:', FIREBASE_AUTH?.currentUser?.uid) 
    if (userId == FIREBASE_AUTH?.currentUser?.uid) {
      try {
        await updateDoc(currentClient, {
          name: clientName,
          injuryDescription: clientInjuryDescription,
          email: clientEmail,
          protocol: protocolRef
        })
        navigation.navigate("Client")
      } catch (err) {
        console.error(err)
      }
    } else {
        console.log('error with Auth')
    }
  }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Update Client Info</Button>
    </View>
  )
}

export default UpdateClientButton
