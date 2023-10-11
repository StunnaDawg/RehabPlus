import { View, Text, FlatList, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"
import DatabaseExercise from "./DatabaseExercise"
import getExerciseFireStoreData from "../../functions/getExerciseData"
import { db } from "../../firebase"
import { useIsFocused } from "@react-navigation/native"
import { collection } from "firebase/firestore"
import { useSingleWorkoutContext } from "../../workoutContext"

const DatabaseCategories = () => {
  const [exerciseCategories, setExerciseCategories] = useState([])
  const [exerciseWorkoutData, setExerciseWorkoutData] = useSingleWorkoutContext({})
  const [pressedButtonId, setPressedButtonId] = useState('85ZJ5LvyxECGoN0GMjHZ')
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

  const getExercisesForCategory = (categoryId) => {
    const category = exerciseCategories.find(cat => cat.id === categoryId);
    
    if (category) {
      return category.exercises;
    }
  
    return [];
  };

  return (
    <>
      <FlatList
        horizontal={true}
        data={exerciseCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
     <FlatList className='pb-96'
  data={getExercisesForCategory(pressedButtonId)}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => {
    const exerciseNameKey = Object.keys(item).find(key => key !== "id");
    const exerciseTitle = item[exerciseNameKey].title;

    return (
      <View>
        <DatabaseExercise
          id={item.id}
          idOfCategory={pressedButtonId}
          exerciseName={exerciseTitle}
        />
      </View>
    );
  }}
/>

    </>
  )
}

export default DatabaseCategories
