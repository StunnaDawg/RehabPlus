import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../../../context/workoutContext"
import { useEditWorkoutContext } from "../../../../context/editWorkoutContext"
import { useSingleEditProtocolContext } from "../../../../context/protocolContext"
import AddWorkoutButton from "./CreateWorkoutButton"
import AddWorkoutExerciseWidget from "./AddWorkoutExerciseWidget"
import { NavigationType } from "../../../../@types/navigation"
import { useExerciseContext } from "../../../../context/exerciseContext"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { WorkoutExercise } from "../../../../@types/firestore"

const AddWorkoutCurrentProtocol = () => {
  const { workoutData } = useSingleWorkoutContext()
  const { editWorkoutData } = useEditWorkoutContext()
  const { exerciseData } = useExerciseContext()
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { protocolEditData } = useSingleEditProtocolContext()
  const [workoutTitleText, setWorkoutTitleText] = useState<string>()
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState<string>()
  const [onAppear, setOnAppear] = useState<boolean>(true)
  const navigation = useNavigation<NavigationType>()

  return (
    <>
      <View className="mx-4 my-1">
        <AddWorkoutButton
          workoutTitle={workoutTitleText}
          workoutDescription={workoutDescriptionText}
          workoutExercises={exerciseData}
          protocolId={protocolEditData.id}
          phaseId={currentPhasesId}
        />
      </View>
      <View className="mx-4 my-1">
        <Text>Workout Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWorkoutTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Workout Description</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWorkoutDescriptionText(text)}
        ></TextInput>
      </View>
      <View className="mx-4 my-1">
        <Button
          icon="dumbbell"
          onPress={async () => {
            setOnAppear(false)
            navigation.navigate("ExerciseDataBase")
          }}
        >
          Add Exercise
        </Button>
      </View>
      <ScrollView className="pb-96">
        {exerciseData.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log("exercsie edit widget", index, exercise.exercise)
          return (
            <AddWorkoutExerciseWidget
              key={index}
              id={exercise.categoryId}
              categoryId={exercise.categoryId}
              letter={letterData}
              index={index + 1}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

export default AddWorkoutCurrentProtocol
