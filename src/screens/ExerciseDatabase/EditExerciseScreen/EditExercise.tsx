import { View, Text, ScrollView } from "react-native"
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { RouteParamsType } from "../../../@types/navigation"
import {
  ExerciseDataBaseCategory,
  ExerciseDataBaseExercise,
} from "../../../@types/firestore"
import getSingleDbExercise from "../../../functions/getSingleDbExercise"
import { Button, Modal, Portal, TextInput } from "react-native-paper"
import ChooseCategory from "../CreateExerciseScreen/ChooseCategory"
import CreateCategory from "../CreateExerciseScreen/CreateCategoryModal"
import UpdateExerciseButton from "./components/UpdateExercise"

const EditExercise = () => {
  const [exerciseName, setExerciseName] = useState<string>("")
  const [exerciseDescriptionState, setExerciseDescriptionState] =
    useState<string>()
  const [categoryName, setCategoryName] = useState<string>("All Categories")
  const [exercise, setExercise] = useState<ExerciseDataBaseExercise>(
    {} as ExerciseDataBaseExercise
  )
  const [categoryIdState, setCategoryIdState] = useState<string>("")
  const [chooseExerciseCategories, setChooseExerciseCategories] = useState<
    ExerciseDataBaseCategory[]
  >([])
  const [visible, setVisible] = useState<boolean>(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: "white", padding: 20 }
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()

  const { title, exerciseDescription, id, categoryId } = route.params

  useEffect(() => {
    console.log("loading")

    const loadExercise = async () => {
      try {
        if (id && categoryId) {
          console.log("loading edit exercise Page")
          getSingleDbExercise(setExercise, id, categoryId)
        } else {
          console.log("Yo where are the IDs?")
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadExercise()
  }, [])

  return (
    <ScrollView>
      <View>
        <Text className="text-xl">Create a new Exercise</Text>
      </View>
      <View>
        <TextInput
          placeholder={title}
          onChangeText={(text) => setExerciseName(text)}
        ></TextInput>
      </View>
      <View>
        <TextInput
          placeholder={exerciseDescription}
          onChangeText={(text) => setExerciseDescriptionState(text)}
        ></TextInput>
      </View>

      <ChooseCategory
        chooseExerciseCategories={chooseExerciseCategories}
        setChooseExerciseCategories={setChooseExerciseCategories}
        setChosenCategory={setCategoryName}
        setCategoryId={setCategoryIdState}
        chosenCategory={categoryName}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <CreateCategory
            setCategories={setChooseExerciseCategories}
            hideModal={setVisible}
          />
        </Modal>
      </Portal>
      <Button onPress={showModal}>Create Category</Button>
      <View className="flex flex-1 flex-row justify-center">
        <Button
          onPress={() => {
            console.log("Delete")
          }}
        >
          Back
        </Button>
        <Button
          onPress={() => {
            console.log("Save")
          }}
        >
          Next
        </Button>
        <UpdateExerciseButton
          exerciseTitle={exerciseName}
          exerciseDescription={exerciseDescription}
          categoryId={categoryId}
          exerciseId={id}
        />
      </View>
    </ScrollView>
  )
}

export default EditExercise
