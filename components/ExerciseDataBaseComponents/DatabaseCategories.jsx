import { View, Text, FlatList, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"
import DatabaseExercise from "./DatabaseExercise"
import getExerciseFireStoreData from "../../functions/getExerciseData"
import { db } from "../../firebase"
import { useIsFocused } from "@react-navigation/native"
import { collection } from "firebase/firestore"

const DatabaseCategories = () => {
  const [exerciseCategories, setExerciseCategories] = useState([])
  const [pressedButtonId, setPressedButtonId] = useState(null)
  const exercisesCollectionRef = collection(db, "exerciseCategories")
  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchFireStoredata = async () => {
      try {
        console.log("trying")
        getExerciseFireStoreData(setExerciseCategories, exercisesCollectionRef)
      } catch (err) {
        console.error(err)
      }
    }
    fetchFireStoredata()
  }, [isFocused])

  useEffect(() => {
    console.log("database data", ...exerciseCategories)
  }, [exerciseCategories])

  const renderItem = ({ item: category }) => (
    <Button
      key={category.id}
      className="mx-1 py-0"
      mode={pressedButtonId === category.id ? "contained" : "outlined"}
      onPress={() => {
        pressedButtonId === category.id
          ? setPressedButtonId(null)
          : setPressedButtonId(category.id)
      }}
    >
      {category.title}
    </Button>
  )

  return (
    <>
      <FlatList
        horizontal={true}
        data={exerciseCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView>
      {exerciseCategories.map((category) => {
  if (category.id === pressedButtonId) {
    return category.exercises.map((exercise) => {
      const exerciseNameKey = Object.keys(exercise).find(
        (key) => key !== "id"
      );
      const exerciseTitle = exercise[exerciseNameKey].title;
      return (
        <View key={exercise.id}>
          <DatabaseExercise
            id={exercise.id}
            exerciseName={exerciseTitle}
          />
        </View>
      );
    });
  }
  return null; // Or some default rendering if there's none matching pressedButtonId
})}
      </ScrollView>
    </>
  )
}

export default DatabaseCategories
