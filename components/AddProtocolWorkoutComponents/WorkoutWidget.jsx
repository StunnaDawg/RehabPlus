import { View } from "react-native"
import { Button, Card, Text } from "react-native-paper"
import ExerciseImage from "../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import GetSingleExercise from "../../functions/getSingleExercise"

const ExerciseWidget = ({ id }) => {

useEffect(() => {
    // GetSingleExercise(id)
}, [])
  return (
    <Card mode="contained" className="mt-3 mx-8 ">
      <Card.Content className="flex-1 flex-row justify-center">
        <Text variant="titleLarge"> {id} </Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        <Card.Cover className="w-20 h-20" source={ExerciseImage} />
        <Card.Actions className="flex-1 flex-col">
          <Button className="my-1">View</Button>
          <Button className="my-1">Delete</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default ExerciseWidget
