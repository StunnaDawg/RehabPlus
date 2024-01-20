import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { db } from "../../../../firebase"
import { updateDoc, collection, doc } from "firebase/firestore"
import { TabNavigationType } from "../../../../@types/navigation"
import uploadImage from "../../../../functions/uploadImage"

type UpdateButtonProps = {
  protocolTitle: string
  protocolOutline?: string
  id: string
  protocolPublic: boolean
  imageUrl?: string
}

const UpdateButton = ({
  protocolTitle,
  protocolOutline,
  id,
  protocolPublic,
  imageUrl,
}: UpdateButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const protocolsCollectionRef = collection(db, "protocols")
  const currentProtocol = doc(protocolsCollectionRef, id)
  const [otherImageUrl, setImageUrl] = useState<string>("")

  const onSubmitProtocol = async (imageDownload: string) => {
    try {
      if (imageDownload) {
        await updateDoc(currentProtocol, {
          title: protocolTitle,
          description: protocolOutline,
          public: protocolPublic,
          imageUri: imageDownload,
        })
      }
      if (imageDownload === "") {
        await updateDoc(currentProtocol, {
          title: protocolTitle,
          description: protocolOutline,
          public: protocolPublic,
        })
      }
      navigation.navigate("Protocol")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View>
      <Button
        textColor="black"
        onPress={async () => {
          if (imageUrl) {
            await uploadImage(
              imageUrl,
              "image",
              protocolTitle,
              setImageUrl,
              onSubmitProtocol
            )
          } else {
            onSubmitProtocol("")
          }
        }}
      >
        Update Protocol
      </Button>
    </View>
  )
}

export default UpdateButton
