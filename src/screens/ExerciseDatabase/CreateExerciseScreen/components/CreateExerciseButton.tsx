import { View, Text } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"

type CreateExerciseButtonProps = {
  exerciseTitle: string
  exerciseDescription?: string
  categoryId: string
}

const CreateExerciseButton = ({
  exerciseTitle,
  exerciseDescription,
  categoryId,
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
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View>
      <Button
        onPress={() => {
          handleExerciseCreation()
          navigation.navigate("Protocol")
        }}
      >
        Create Exercise
      </Button>
    </View>
  )
}

export default CreateExerciseButton
