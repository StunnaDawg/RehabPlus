import { View } from "react-native"
import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import GetSingleExercise from "../../../functions/getSingleExercise"
import { useIsFocused } from "@react-navigation/native" 

const CompleteWorkoutWidget = ({ id, categoryId, workoutTitle, workoutDescription }) => {
    const [widgetData, setWidgetData] = useState({})
    const isFocused = useIsFocused()
    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       GetSingleExercise(id, categoryId, setWidgetData)
    //     } catch (err) {
    //       console.error("exercise widget error:", err)
    //     }
    //   }
    //   getData()
    // }, [isFocused])
  
    // useEffect(() => {
    //   console.log({ ...widgetData })
    // }, [widgetData])
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
            <Button className="my-1">View</Button>
            <Button className="my-1">Delete</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    )
  }
  
  export default CompleteWorkoutWidget