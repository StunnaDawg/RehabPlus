import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { db, FIREBASE_AUTH } from "../../../../../firebase"
import { addDoc, collection } from "firebase/firestore"
import { TabNavigationType } from "../../../../../@types/navigation"

type CreateProtocolButtonProps = {
  protocolTitle: string
  protocolOutline: string
  protocolWeeks: number
  protocolPublic: boolean
}

const CreateProtocolButton = ({
  protocolTitle,
  protocolOutline,
  protocolWeeks,
  protocolPublic,
}: CreateProtocolButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const protocolsCollectionRef = collection(db, "protocols")

  const onSubmitProtocol = async () => {
    try {
      await addDoc(protocolsCollectionRef, {
        title: protocolTitle,
        description: protocolOutline,
        weeks: protocolWeeks,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        public: protocolPublic,
      })
      navigation.navigate("Protocol")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Create Protocol</Button>
    </View>
  )
}

export default CreateProtocolButton
