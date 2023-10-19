import { StyleSheet, View } from "react-native"
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper"
import ExerciseImage from "../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import GetSingleExercise from "../../functions/getSingleExercise"
import { useIsFocused } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../workoutContext"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

const ExerciseWidget = ({ id, categoryId, letter, index, reps, sets }) => {
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext(
    []
  )
  const [widgetData, setWidgetData] = useState({})
  const [exerciseSets, setExerciseSets] = useState(sets || "0")
  const [exerciseReps, setExerciseReps] = useState(reps || "0")
  const isFocused = useIsFocused()

  useEffect(() => {
    const getData = async () => {
      try {
        GetSingleExercise(id, categoryId, setWidgetData)
      } catch (err) {
        console.error("exercise widget error:", err)
      }
    }
    getData()
  }, [isFocused])

  useEffect(() => {
    setWidgetData({ ...widgetData, reps: exerciseReps })
  }, [exerciseReps])

  useEffect(() => {
    setWidgetData({ ...widgetData, sets: exerciseSets })
  }, [exerciseSets])

  useEffect(() => {
    console.log("exercise widget data", { ...widgetData })
  }, [widgetData])
  return (
    <Card mode="outlined" className=" flex-1 mt-3 mx-8 bg-blue-400">
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleMedium">
          {letter}
          {index}.
        </Text>
        <Text variant="titleMedium">
          {" "}
          {widgetData &&
          Object.values(widgetData)[0] &&
          Object.values(widgetData)[0].title
            ? Object.values(widgetData)[0].title
            : "Loading..."}
        </Text>
        <IconButton icon="eye" size={18}>
          View
        </IconButton>
        <IconButton icon="delete" size={18}>
          Delete
        </IconButton>
      </Card.Content>
      <Card.Content className="flex-1 flex-row justify-center items-center ">
        <Card.Actions>
          <Text>Sets:</Text>
          <TextInput
            style={styles.textInput}
            underlineColor="black"
            selectionColor="blue"
            dense={true}
            mode="flat"
            defaultValue={exerciseSets}
            keyboardType="numeric"
            onChangeText={(sets) => {
              setExerciseSets(sets)
            }}
          ></TextInput>
          <Divider />
          <Text>Reps:</Text>
          <TextInput
            style={styles.textInput}
            dense={true}
            mode="flat"
            defaultValue={exerciseReps}
            keyboardType="numeric"
            onChangeText={(reps) => {
              setExerciseReps(reps)
            }}
          ></TextInput>
        </Card.Actions>
      </Card.Content>
      <Card.Content className="flex-1 flex-row justify-center">
        <Card.Actions>
          <Button
            onPress={async () => {
              await setExerciseWorkoutData((prevData) => {
                const updatedData = [...prevData]
                const existingExerciseData = updatedData.find(
                  (exercise) => exercise.exerciseId === id
                )

                if (existingExerciseData) {
                  existingExerciseData.reps = exerciseReps
                  existingExerciseData.sets = exerciseSets
                } else {
                  updatedData.push({
                    exerciseId,
                    reps: exerciseReps,
                    sets: exerciseSets,
                  })
                }

                return updatedData
              })
            }}
            icon="pencil"
          >
            Save Updates
          </Button>
          <Button icon="plus">Add Superset</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  textInput: {
    // Set the desired width
    height: 30,
    width: 50,
  },
})

export default ExerciseWidget
