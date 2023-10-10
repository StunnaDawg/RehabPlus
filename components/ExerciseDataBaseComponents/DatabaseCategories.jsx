import { View, Text, FlatList, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"
import DatabaseExercise from "./DatabaseExercise";
import getExerciseFireStoreData from "../../functions/getClientFireStoreData";
import { db } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";


const DatabaseCategories = () => {
  const [exerciseCategories, setExerciseCategories] = useState()
  const [pressedButtonId, setPressedButtonId] = useState(null)
const exercisesCollectionRef = (db, 'exercises/zDaytX3oy7fHbpTJ5YBX')
const isFocused = useIsFocused()

  useEffect(() => {
    getExerciseFireStoreData(setExerciseCategories, exercisesCollectionRef)
  }, [isFocused])

  useEffect(() => {
    console.log(exerciseCategories)
  }, [exerciseCategories])

  const renderItem = ({ item: exercises}) => (
    <Button
    className='mx-1 py-0' 
      mode={pressedButtonId === category.id ? "contained" : "outlined"}
      onPress={() => {
        pressedButtonId === category.id
          ? setPressedButtonId(null)
          : setPressedButtonId(category.id);
      }}
    >
      {category.title}
    </Button>
  );
  
  return (
    <>
    <FlatList
    horizontal={true}
      data={Categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
    <ScrollView>
    <DatabaseExercise />
    <DatabaseExercise /><DatabaseExercise /><DatabaseExercise /><DatabaseExercise /><DatabaseExercise /><DatabaseExercise />
    </ScrollView>
    </>
  )
}

export default DatabaseCategories