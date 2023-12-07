import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import { Button } from "react-native-paper"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { ExerciseDataBaseCategory } from "../../../../@types/firestore"
import getExerciseFireStoreData from "../../../../functions/getExerciseData"

type createCategoryProps = {
  categoryTitle: string
  setNewCategories: Dispatch<SetStateAction<ExerciseDataBaseCategory[]>>
  hideModal: Dispatch<SetStateAction<boolean>>
}

const CreateCategoryButton = ({
  categoryTitle,
  setNewCategories,
  hideModal,
}: createCategoryProps) => {
  const categoryCollection = collection(db, "exerciseCategories")
  const CreateCategory = async () => {
    await addDoc(categoryCollection, {
      title: categoryTitle,
      userId: FIREBASE_AUTH?.currentUser?.uid,
    })

    getExerciseFireStoreData(setNewCategories, categoryCollection)
  }

  return (
    <View>
      <Button
        onPress={() => {
          CreateCategory()
          hideModal(false)
        }}
      >
        Add Category
      </Button>
    </View>
  )
}

export default CreateCategoryButton
