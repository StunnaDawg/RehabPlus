import { View } from "react-native"
import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native" 
import { useSingleEditWorkoutContext } from "../../../editWorkoutContext"
import GetSingleWorkout from "../../../functions/getSingleWorkout"

const CompleteWorkoutEditWidget = ({ id , protocolId, workoutTitle }) => {
  const [editWorkoutData, setEditWorkoutData] = useSingleEditWorkoutContext([])
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const getData = async () => {
            await GetSingleWorkout(id, protocolId, setEditWorkoutData)
        }
  
    useEffect(() => {
      console.log('workout to be edited', editWorkoutData)
    }, [editWorkoutData])
    return (
      <Card mode="contained" className="mt-3 mx-8 ">
        <Card.Content className="flex-1 flex-row justify-center">
          <Text variant="titleLarge">
           {workoutTitle}
          </Text>
        </Card.Content>
        <Card.Content className="flex-1 flex-row">
          {/* <Card.Cover className="w-20 h-20" source={ExerciseImage} /> */}
          <Card.Actions className="flex-1 flex-col">
            <Button className="my-1" onPress={async () => {await getData(); navigation.navigate('EditWorkoutScreen')}}>Edit</Button>
            <Button className="my-1">Delete</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    )
  }
  
  export default CompleteWorkoutEditWidget