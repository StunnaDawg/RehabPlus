import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

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
  const storage = getStorage()
  const exerciseImageRef = ref(storage, imageUri)

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
          imageUri: imageUri,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleImageUpload = async () => {
    if (imageUri) {
      try {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = function () {
            resolve(xhr.response)
          }
          xhr.onerror = function (e) {
            console.log(e)
            reject(new TypeError("Network request failed"))
          }
          xhr.responseType = "blob"
          xhr.open("GET", imageUri, true)
          xhr.send(null)
        })

        const fileRef = ref(getStorage(), imageUri)
        const result = await uploadBytes(fileRef, blob)

        // We're done with the blob, close and release it

        return await getDownloadURL(fileRef)
      } catch (err) {
        console.log("we Errored")
        console.error(err)
      }
    }
  }

  return (
    <View>
      <Button
        onPress={() => {
          handleExerciseCreation()
          handleImageUpload()
          navigation.navigate("Protocol")
        }}
      >
        Create Exercise
      </Button>
    </View>
  )
}

export default CreateExerciseButton
