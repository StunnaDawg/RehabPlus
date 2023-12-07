import { useEffect, useState } from "react"
import { Text, View, ScrollView } from "react-native"
import { Button, TextInput } from "react-native-paper"
import AddCategory from "./AddCategory"

const CreateExercise = () => {
  const [exerciseName, setExerciseName] = useState<string>()
  const [exerciseDescription, setExerciseDescription] = useState<string>()

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

      <View>
        <Text>Choose Your Category</Text>
      </View>
      <ScrollView>
        <AddCategory />
      </ScrollView>

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
      </View>
    </>
  )
}

export default CreateExercise
