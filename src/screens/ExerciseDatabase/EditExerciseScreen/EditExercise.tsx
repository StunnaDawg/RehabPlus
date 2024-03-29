import { View, Text, ScrollView, Image } from "react-native"
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
import DeleteButton from "../../../components/DeleteButton"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc } from "firebase/firestore"
import UploadImage from "../../../components/UploadImage"
import DeleteImageButton from "../../../components/DeleteImageButton"

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
  const [imageUrl, setImageUrl] = useState<string>("")
  const [newImageUrl, setNewImageUrl] = useState<string>("")

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: "white", padding: 20 }
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()

  const { title, exerciseDescription, id, categoryId } = route.params

  let exerciseDocRef = undefined

  if (id && categoryId) {
    exerciseDocRef = doc(db, "exerciseCategories", categoryId, "exercises", id)
  }

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

  useEffect(() => {
    if (exercise.imageUrl) {
      setImageUrl(exercise.imageUrl)
    }

    setExerciseName(exercise.title)
    setExerciseDescriptionState(exercise.description)
    if (categoryId) {
      setCategoryIdState(categoryId)
    }
  }, [exercise])

  useEffect(() => {
    if (imageUrl !== exercise.imageUrl) {
      setNewImageUrl(imageUrl)
    }
  }, [imageUrl])

  useEffect(() => {
    setImageUrl(newImageUrl)
  }, [newImageUrl])

  return (
    <ScrollView className="bg-slate-500">
      <View className="flex flex-1 flex-row justify-center">
        <Text className="text-xl text-center font-bold">Edit Exercise</Text>
      </View>
      <DeleteButton
        userId={FIREBASE_AUTH?.currentUser?.uid}
        docRef={exerciseDocRef}
        navigationLocation="ExerciseDataBase"
        deleteName="Delete Exercise"
      />
      <View className="mx-2">
        <TextInput
          className="bg-white"
          placeholder={title}
          onChangeText={(text) => setExerciseName(text)}
        ></TextInput>
      </View>
      <View className="mx-2">
        <TextInput
          className="bg-white"
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
      <View className="flex flex-row justify-center">
        {imageUrl !== "" ? (
          <View className="flex flex-col">
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200 }}
            />
            <DeleteImageButton
              fileLocation={imageUrl}
              setImageUrl={setImageUrl}
              setNewImageUrl={setNewImageUrl}
            />
          </View>
        ) : (
          <UploadImage setUri={setNewImageUrl} showImage={false} />
        )}
      </View>

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
      <Button onPress={showModal} textColor="black">
        Create Category
      </Button>
      <View className="flex flex-1 flex-row justify-center">
        <Button
          textColor="black"
          onPress={() => {
            console.log("Delete")
          }}
        >
          Back
        </Button>
        <Button
          textColor="black"
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
          imageUrl={newImageUrl}
        />
      </View>
    </ScrollView>
  )
}

export default EditExercise
