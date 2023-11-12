import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useSingleEditWorkoutContext } from "../../context/editWorkoutContext"
import { useIsFocused } from "@react-navigation/native"
import { useSingleProtocolContext } from "../../context/protocolContext"
import { useRefreshContext } from "../../context/refreshKey"
import AddWorkoutButton from "./CreateWorkoutButton"
import AddWorkoutExerciseWidget from "./AddWorkoutExerciseWidget"
import { useCurrentPhasesContext } from "../../context/phasesAddContext"

const AddWorkoutCurrentProtocol = () => {
  const [editWorkoutData, setEditWorkoutData] = useSingleEditWorkoutContext([])
  const [protocolEditData] = useSingleProtocolContext()
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  const [refreshKey, setRefreshKey] = useRefreshContext(false)
  const [workoutTitleText, setWorkoutTitleText] = useState('')
  const [workoutDescriptionText, setWorkoutDescriptionText] = useState('')
  const [onAppear, setOnAppear] = useState(true)
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  return (
    <>
      <View className="mx-4 my-1">
          <AddWorkoutButton
            workoutTitle={workoutTitleText}
            workoutDescription={workoutDescriptionText}
            workoutExercises={exerciseWorkoutData}
            setOnAppear={setOnAppear}
            workoutId={editWorkoutData.id}
            protocolId={protocolEditData.id}
            phaseId={currentPhasesData}
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
          onPress={async () => {setOnAppear(false); navigation.navigate("ExerciseDataBase")}}
        >
          Add Exercise
        </Button>
      </View>
      <ScrollView className="pb-96">
        {exerciseWorkoutData.map((exercise, index) => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

          const letterData = letters[index % letters.length]

          console.log("exercsie edit widget", index, exercise.exerciseId)
          return (
            <AddWorkoutExerciseWidget
              key={exercise.exerciseId}
              id={exercise.exerciseId}
              categoryId={exercise.categoryId}
              letter={letterData}
              index={index + 1}
              sets={exercise.sets}
              reps={exercise.reps}
              protocolId={protocolEditData.id}
              workoutId={editWorkoutData.id}
              userId={protocolEditData.userId}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

export default AddWorkoutCurrentProtocol
