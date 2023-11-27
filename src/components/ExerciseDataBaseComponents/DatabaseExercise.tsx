import { Button, Card, Text } from "react-native-paper"
import React, { useEffect } from "react"
import { useSingleWorkoutContext } from "../../context/workoutContext"
import { useNavigation } from "@react-navigation/native"

type DatabaseExerciseProps = { 
  exerciseName: string
  id: string
  idOfCategory: string
}

const DatabaseExercise = ({ exerciseName, id, idOfCategory }: DatabaseExerciseProps) => {
  const {workoutData ,setWorkoutData} = useSingleWorkoutContext()
  const navigation = useNavigation()

  useEffect(() => {
    console.log('edit workout data',workoutData)
  }, [workoutData])
  return (
    <Card mode="contained" className="mt-3 mx-8 ">
      <Card.Content className="flex-1 flex-row justify-center">
        <Text variant="titleLarge"> {exerciseName}</Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        {/* <Card.Cover className="w-20 h-20" /> */}
        <Card.Actions className="flex-1 flex-col">
          <Button className="my-1">View</Button>
          <Button
           onPress={() => {
            setWorkoutData((prevData) => {
              if (prevData.workout && prevData.workout.exercises) {
                return {
                  ...prevData,
                  workout: {
                    ...prevData.workout,
                    exercises: prevData.workout.exercises.map((exercise) => ({
                      ...exercise,
                      exerciseId: id,
                      categoryId: idOfCategory
                    }))
                  }
                };
              } else {
                return prevData;
              }
           });
           console.log('widget pressed',workoutData)
            navigation.goBack()
          }}
          >
            Add Workout
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default DatabaseExercise
