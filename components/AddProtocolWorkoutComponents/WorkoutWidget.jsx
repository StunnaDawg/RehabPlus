import { StyleSheet, View } from "react-native"
import { Button, Card, Divider, IconButton, Text, TextInput } from "react-native-paper"
import ExerciseImage from "../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import GetSingleExercise from "../../functions/getSingleExercise"
import { useIsFocused } from "@react-navigation/native"

const ExerciseWidget = ({ id, categoryId }) => {
  const [widgetData, setWidgetData] = useState({})
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
    console.log({ ...widgetData })
  }, [widgetData])
  return (
    <Card mode="outlined" className=" flex-1 mt-3 mx-8 bg-blue-400" >
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleMedium">
          {" "}
          {widgetData &&
          Object.values(widgetData)[0] &&
          Object.values(widgetData)[0].title
            ? Object.values(widgetData)[0].title
            : "Loading..."}
        </Text> 
        <IconButton icon='eye' size={18}>View</IconButton>
          <IconButton icon='delete' size={18}>Delete</IconButton>
      </Card.Content>
      <Card.Content className='flex-1 flex-row justify-center items-center '>
        <Card.Actions>
        <Text>Sets:</Text>
          <TextInput style={styles.textInput} underlineColor='black' selectionColor="blue" dense={true} mode="flat" keyboardType="numeric"></TextInput>
          <Divider/>
          <Text>Reps:</Text>
          <TextInput style={styles.textInput} dense={true} mode="flat" keyboardType="numeric" ></TextInput>
        </Card.Actions>
      </Card.Content>
     
    </Card>
  )
}

const styles = StyleSheet.create({
    textInput: { // Set the desired width
      height: 30, 
      width: 40,
    },
  });

export default ExerciseWidget
