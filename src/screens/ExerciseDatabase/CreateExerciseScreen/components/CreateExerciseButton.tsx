import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
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

  const handleExerciseCreation = async () => {
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
          imageUri: imageUri || "No image",
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  const getBlobForUri = async (uri: string) => {
    if (uri) {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", uri, true)
        xhr.send(null)
      })

      uploadImage(blob)
    }
  }

  return (
    <View>
      <Button
        onPress={() => {
          handleExerciseCreation()
          if (imageUri) getBlobForUri(imageUri)
          navigation.navigate("Protocol")
        }}
      >
        Create Exercise
      </Button>
    </View>
  )
}

export default CreateExerciseButton
