import { useEffect, useState } from "react"
import { Text, View, ScrollView } from "react-native"
import { Button, Modal, Portal, TextInput } from "react-native-paper"
import AddCategory from "./ChooseCategory"
import CreateCategory from "./CreateCategoryModal"
import { ExerciseDataBaseCategory } from "../../../@types/firestore"
import ChooseCategory from "./ChooseCategory"
import CreateExerciseButton from "./components/CreateExerciseButton"

const CreateExercise = () => {
  const [exerciseName, setExerciseName] = useState<string>("")
  const [exerciseDescription, setExerciseDescription] = useState<string>()
  const [categoryName, setCategoryName] = useState<string>("All Categories")
  const [categoryId, setCategoryId] = useState<string>("")
  const [chooseExerciseCategories, setChooseExerciseCategories] = useState<
    ExerciseDataBaseCategory[]
  >([])

  const [visible, setVisible] = useState<boolean>(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: "white", padding: 20 }

  return (
    <>
      <View>
        <Text className="text-xl">Create a new Exercise</Text>
      </View>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setExerciseName(text)}
        ></TextInput>
      </View>
      <View>
        <TextInput
          placeholder="Description"
          onChangeText={(text) => setExerciseDescription(text)}
        ></TextInput>
      </View>

      <ChooseCategory
        chooseExerciseCategories={chooseExerciseCategories}
        setChooseExerciseCategories={setChooseExerciseCategories}
        setChosenCategory={setCategoryName}
        setCategoryId={setCategoryId}
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
        <CreateExerciseButton
          exerciseTitle={exerciseName}
          exerciseDescription={exerciseDescription}
          categoryId={categoryId}
        />
      </View>
    </>
  )
}

export default CreateExercise
