import { Alert, StyleSheet, View } from "react-native"
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper"
import React, { useEffect, useState } from "react"
import GetSingleExercise from "../../../../functions/getSingleExercise"
import { useIsFocused } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../../../context/workoutContext"
import { useRefreshKeyContext } from "../../../../context/refreshKey"
import { WorkoutExercise } from "../../../../@types/firestore"

type ExerciseWidgetProps = {
  id: string
  categoryId: string
  exerciseTitle: string
  letter: string
  index: number
}

const ExerciseWidget = ({
  id,
  categoryId,
  exerciseTitle,
  letter,
  index,
}: ExerciseWidgetProps) => {
  // const {workoutData, setWorkoutData} = useSingleWorkoutContext()
  // const {refreshKey, setRefreshKey} = useRefreshKeyContext()
  const [widgetData, setWidgetData] = useState<WorkoutExercise>()
  const [exerciseSets, setExerciseSets] = useState("0")
  const [exerciseReps, setExerciseReps] = useState("0")
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log(id)
  }, [])

  return (
    <>
      <Card mode="outlined" className=" flex-1 mt-3 mx-8 bg-blue-400">
        <Card.Content className="flex-1 flex-row justify-center items-center">
          <Text variant="titleMedium">
            {letter}
            {index}.
          </Text>
          <Text variant="titleMedium">
            {" "}
            {exerciseTitle ? exerciseTitle : "Loading..."}
          </Text>
          {/* <IconButton icon="eye" size={18}/>
        {/* Delete Button */}
          {/* <IconButton icon="delete" size={18} onPress={async () => {await deleteWidget(id); setRefreshKey(+1)}}/> */}
        </Card.Content>
        <Card.Content className="flex-1 flex-row justify-center items-center ">
          {/* <Card.Actions>
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
        </Card.Actions> */}
        </Card.Content>
        <Card.Content className="flex-1 flex-row justify-center">
          {/* <Card.Actions>
          <Button
            onPress={async () => {
              await setExerciseWorkoutData((prevData) => {
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
        </Card.Actions> */}
        </Card.Content>
      </Card>
    </>
  )
}
// const styles = StyleSheet.create({
//   textInput: {
//     // Set the desired width
//     height: 30,
//     width: 50,
//   },
// })

export default ExerciseWidget
