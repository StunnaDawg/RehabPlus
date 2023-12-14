import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"

type UpdateExerciseButtonProps = {
  exerciseTitle: string
  exerciseDescription?: string
  categoryId?: string
  exerciseId?: string
}

const UpdateExerciseButton = ({
  exerciseTitle,
  exerciseDescription,
  categoryId,
  exerciseId,
}: UpdateExerciseButtonProps) => {
  const navigation = useNavigation<TabNavigationType>()

  const handleExerciseUpdate = async () => {
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
          await updateDoc(exerciseRef, {
            title: exerciseTitle,
            description: exerciseDescription,
            userId: FIREBASE_AUTH?.currentUser?.uid,
          })
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
        onPress={() => {
          handleExerciseUpdate()
          navigation.navigate("ExerciseDataBase")
        }}
      >
        Update Exercise
      </Button>
    </View>
  )
}

export default UpdateExerciseButton
