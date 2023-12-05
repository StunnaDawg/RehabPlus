import { StyleSheet } from "react-native"
import { Button, Card, Divider, Text, TextInput } from "react-native-paper"
import React, { useEffect, useState } from "react"
import GetMultipleExercise from "../../../../functions/getMultipleExercises"
import { useIsFocused } from "@react-navigation/native"
import { WorkoutExercise } from "../../../../@types/firestore"
import { useExerciseContext } from "../../../../context/exerciseContext"

type AddWorkoutExerciseWidgetProps = {
  id: string
  categoryId: string
  letter: string
  index: number
}

const AddWorkoutExerciseWidget = ({
  id,
  categoryId,
  letter,
  index,
}: AddWorkoutExerciseWidgetProps) => {
  const { setExerciseData } = useExerciseContext()
  const [widgetData, setWidgetData] = useState<WorkoutExercise[]>()
  const [exerciseSets, setExerciseSets] = useState("0")
  const [exerciseReps, setExerciseReps] = useState("0")
  const isFocused = useIsFocused()

  useEffect(() => {
    const getData = async () => {
      try {
        GetMultipleExercise(id, categoryId, setWidgetData)
      } catch (err) {
        console.error("exercise widget error:", err)
      }
    }
    getData()
  }, [isFocused])

  useEffect(() => {
    setWidgetData((prevData) =>
      prevData?.map((exercise) => ({
        ...exercise,
        reps: exerciseReps,
      }))
    )
  }, [exerciseReps])

  useEffect(() => {
    setWidgetData((prevData) =>
      prevData?.map((exercise) => ({
        ...exercise,
        sets: exerciseSets,
      }))
    )
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
        {/* <Text variant="titleMedium">
          {" "}
          {widgetData &&
          Object.values(widgetData)[0] &&
          Object.values(widgetData)[0].title
            ? Object.values(widgetData)[0].title
            : "Loading..."}
        </Text> */}
        <Button>View</Button>
        <Button>Delete</Button>
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
            onChangeText={(reps) => setExerciseReps(reps)}
          ></TextInput>
        </Card.Actions>
      </Card.Content>
      <Card.Content className="flex-1 flex-row justify-center">
        <Card.Actions>
          <Button
            onPress={() => {
              setExerciseData((prevData) => {
                const updatedData = [...prevData]
                // Find the existing exercise data object in the array
                const existingExerciseData = updatedData.find(
                  (exercise) => exercise.exerciseId === id
                )

                if (existingExerciseData) {
                  // Merge the reps and sets into the existing object
                  existingExerciseData.reps = exerciseReps
                  existingExerciseData.sets = exerciseSets
                } else {
                  // If the exercise data doesn't exist, add it as a new object
                  updatedData.push({
                    categoryId,
                    exerciseId: id,
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

export default AddWorkoutExerciseWidget
