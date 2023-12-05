import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { db, FIREBASE_AUTH } from "../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import "react-native-get-random-values"
import { useCompleteWorkoutContext } from "../../../../context/completeWorkoutContext"
import { TabNavigationType } from "../../../../@types/navigation"

type CreateButtonProps = {
  protocolTitle: string
  protocolOutline: string
  protocolPublic: boolean
  protocolId: string
}

const CreateButton = ({
  protocolTitle,
  protocolOutline,
  protocolPublic,
  protocolId,
}: CreateButtonProps) => {
  const { setCompleteWorkoutData } = useCompleteWorkoutContext()
  const protocolsCollectionRef = doc(db, "protocols", protocolId)
  const navigation = useNavigation<TabNavigationType>()
  const onSubmitProtocol = async () => {
    try {
      await updateDoc(protocolsCollectionRef, {
        title: protocolTitle,
        description: protocolOutline,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        public: protocolPublic,
      })

      setCompleteWorkoutData([])
      navigation.navigate("Protocol")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Save</Button>
    </View>
  )
}

export default CreateButton
