import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { TextInput } from "react-native-paper"
import CreateCategoryButton from "../ExerciseDataBaseComponents/CreateCategoryButton"
import ExerciseDataBase from "../ExerciseDataBase"
import { ExerciseDataBaseCategory } from "../../../@types/firestore"

type createCategoryProps = {
  setCategories: Dispatch<SetStateAction<ExerciseDataBaseCategory[]>>
  hideModal: Dispatch<SetStateAction<boolean>>
}

const CreateCategory = ({ setCategories, hideModal }: createCategoryProps) => {
  const [categoryTitle, setCategoryTitle] = useState<string>("")

  return (
    <>
      <View className="mx-4 my-1">
        <Text>Category Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setCategoryTitle(text)}
        ></TextInput>
      </View>
      <CreateCategoryButton
        setNewCategories={setCategories}
        categoryTitle={categoryTitle}
        hideModal={hideModal}
      />
    </>
  )
}

export default CreateCategory
