import { View } from "react-native"
import React, { useState } from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
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

  return (
    <View>
      <Button
        textColor="black"
        onPress={async () => {
          if (imageUri) {
            await uploadImage(
              imageUri,
              "image",
              exerciseTitle,
              setImageUrl,
              handleExerciseCreation
            )
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
