import { View, Text } from "react-native"
import React, { useState } from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db, storage } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import uploadImage from "../../../../functions/uploadImage"

type CreateExerciseButtonProps = {
  exerciseTitle: string
  exerciseDescription?: string
  categoryId: string
  imageUri?: string
}

const CreateExerciseButton = ({
  exerciseTitle,
  exerciseDescription,
  categoryId,
  imageUri,
}: CreateExerciseButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const [imageUrl, setImageUrl] = useState<string>("")

  const handleExerciseCreation = async (imageDownload: string) => {
    try {
      if (categoryId) {
        const categoryExercises = collection(
          db,
          "exerciseCategories",
          categoryId,
          "exercises"
        )
        await addDoc(categoryExercises, {
          title: exerciseTitle,
          description: exerciseDescription,
          userId: FIREBASE_AUTH?.currentUser?.uid,
          imageUri: imageDownload,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  const uploadImage = async (uri: string, fileType: string) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(storage, exerciseTitle)
    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Progress", progress, "% done")
      },
      (err) => {
        console.error(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          console.log("file avalible at", downloadUrl)
          setImageUrl(downloadUrl)
          console.log(imageUrl)
          handleExerciseCreation(downloadUrl)
        })
      }
    )
  }

  return (
    <View>
      <Button
        onPress={async () => {
          if (imageUri) {
            await uploadImage(imageUri, "image")
          } else {
            handleExerciseCreation("no image")
          }
          navigation.navigate("Protocol")
        }}
      >
        Create Exercise
      </Button>
    </View>
  )
}

export default CreateExerciseButton
