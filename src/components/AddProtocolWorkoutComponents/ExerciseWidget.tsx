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
import GetSingleExercise from "../../functions/getSingleExercise"
import { useIsFocused } from "@react-navigation/native"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useRefreshKeyContext } from "../../context/refreshKey"
import { WorkoutExercise } from "../../@types/firestore"

type ExerciseWidgetProps = {
  id: string, 
  categoryId: string, 
  letter: string,
  index: number
}

const ExerciseWidget = ({ id, categoryId, letter, index }: ExerciseWidgetProps) => {
  const {workoutData, setWorkoutData} = useSingleWorkoutContext()
  const {refreshKey, setRefreshKey} = useRefreshKeyContext()
  const [widgetData, setWidgetData] = useState<WorkoutExercise>()
  const [exerciseSets, setExerciseSets] = useState("0")
  const [exerciseReps, setExerciseReps] = useState("0")
  const isFocused = useIsFocused()

  const deleteWidget = async (exerciseToRemove)  => {
    // Alert.alert('Warning', 'Are you sure you want to delete this exercise?', [
    // {
    //   text: 'Cancel',
    //   onPress: () => console.log('Cancel Pressed'),
    //   style: 'cancel',
    // },  {text: 'Delete', onPress: async () => {
      setWorkoutData(exercsies => exercsies.filter(exercise=> exercise.exerciseId !== exerciseToRemove))
    }
    
  // }])

  

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

  // useEffect(() => {
  //   setExerciseWorkoutData((prevData) => [
  //     ...prevData,
  //     { sets: exerciseSets, reps: exerciseReps },
  //   ]);
  // }, [exerciseSets, exerciseReps]);

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
        <IconButton icon="eye" size={18}/>
        {/* Delete Button */}
        <IconButton icon="delete" size={18} onPress={async () => {await deleteWidget(id); setRefreshKey(+1)}}/>
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
