import { View, Text } from "react-native"
import React, { useState } from "react"
import { Button } from "react-native-paper"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
import uploadImage from "../../../../functions/uploadImage"

type UpdateExerciseButtonProps = {
  exerciseTitle: string
  exerciseDescription?: string
  categoryId?: string
  exerciseId?: string
  imageUrl?: string
}

const UpdateExerciseButton = ({
  exerciseTitle,
  exerciseDescription,
  categoryId,
  exerciseId,
  imageUrl,
}: UpdateExerciseButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const [newImageUrl, setImageUrl] = useState<string>("")

  const handleExerciseUpdate = async (imageDownload: string) => {
    if (exerciseTitle !== "" && exerciseDescription != "") {
      try {
        if (categoryId && exerciseId) {
          const exerciseRef = doc(
            db,
            "exerciseCategories",
            categoryId,
            "exercises",
            exerciseId
          )
          if (imageDownload !== "no image") {
            await updateDoc(exerciseRef, {
              title: exerciseTitle,
              description: exerciseDescription,
              userId: FIREBASE_AUTH?.currentUser?.uid,
              imageUri: imageDownload,
            })
          } else {
            await updateDoc(exerciseRef, {
              title: exerciseTitle,
              description: exerciseDescription,
              userId: FIREBASE_AUTH?.currentUser?.uid,
            })
          }
        } else {
          console.log("exercise id's don't exist for updating")
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log("don't leave nothing empty")
    }
  }

  return (
    <View>
      <Button
        onPress={async () => {
          if (imageUrl) {
            await uploadImage(
              imageUrl,
              "image",
              exerciseTitle,
              setImageUrl,
              handleExerciseUpdate
            )
          } else {
            handleExerciseUpdate("no image")
          }
          navigation.navigate("ExerciseDataBase")
        }}
      >
        Update Exercise
      </Button>
    </View>
  )
}

export default UpdateExerciseButton
