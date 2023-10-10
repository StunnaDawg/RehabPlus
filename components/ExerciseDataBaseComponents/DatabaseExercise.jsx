import { View, Text } from "react-native"
import { Button, Card } from "react-native-paper"
import ExerciseImage from "../../assets/physcial-medicine.jpg"
import React from "react"

const DatabaseExercise = ({ exerciseName }) => {
  return (
    <Card mode="contained" className="mt-3 mx-8">
        <Card.Content>
      <Text variant="titleLarge">Exercise {exerciseName}</Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        <Card.Cover className="w-20 h-20" source={ExerciseImage} />
        <Card.Actions className="flex-1 flex-col">
          <Button>View</Button>
          <Button>Add Workout</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default DatabaseExercise
