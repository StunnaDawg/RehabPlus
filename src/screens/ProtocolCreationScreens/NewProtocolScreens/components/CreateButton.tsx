import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { db, FIREBASE_AUTH, storage } from "../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import "react-native-get-random-values"
import { useCompleteWorkoutContext } from "../../../../context/completeWorkoutContext"
import { TabNavigationType } from "../../../../@types/navigation"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import uploadImage from "../../../../functions/uploadImage"

type CreateButtonProps = {
  protocolTitle: string
  protocolOutline: string
  protocolPublic: boolean
  protocolId: string
  imageUri?: string
}

const CreateButton = ({
  protocolTitle,
  protocolOutline,
  protocolPublic,
  protocolId,
  imageUri,
}: CreateButtonProps) => {
  const { setCompleteWorkoutData } = useCompleteWorkoutContext()
  const [imageUrl, setImageUrl] = useState<string>("")
  const protocolsCollectionRef = doc(db, "protocols", protocolId)
  const navigation = useNavigation<TabNavigationType>()
  const onSubmitProtocol = async (imageDownload: string) => {
    try {
      await updateDoc(protocolsCollectionRef, {
        title: protocolTitle,
        description: protocolOutline,
        userId: FIREBASE_AUTH?.currentUser?.uid,
        public: protocolPublic,
        imageUri: imageDownload,
      })

      setCompleteWorkoutData([])
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
          if (imageUri) {
            await uploadImage(
              imageUri,
              "image",
              protocolTitle,
              setImageUrl,
              onSubmitProtocol
            )
          } else {
            onSubmitProtocol("no image")
          }
          navigation.navigate("Protocol")
        }}
      >
        Save
      </Button>
    </View>
  )
}

export default CreateButton
