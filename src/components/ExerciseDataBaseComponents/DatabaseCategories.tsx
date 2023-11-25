import { View, FlatList, ListRenderItem } from "react-native"
import React, { useEffect, useState } from "react"
import { Button} from "react-native-paper"
import DatabaseExercise from "./DatabaseExercise"
import getExerciseFireStoreData from "../../functions/getExerciseData"
import { db } from "../../firebase"
import { useIsFocused } from "@react-navigation/native"
import { collection } from "firebase/firestore"
import { ExerciseDataBaseCategory, ExerciseDataBaseExercise } from "../../@types/firestore"
import ExerciseDataBase from "../../screens/ExerciseDataBase"
import GetMultipleExercise from "../../functions/getMultipleExercises"
import getExerciseCategoryData from "../../functions/getExerciseCategoriesData"

const DatabaseCategories = () => {
  const [exerciseCategories, setExerciseCategories] = useState<ExerciseDataBaseCategory[]>([])
  const [exercisesDisplayed, setExercisesDisplayed] = useState<ExerciseDataBaseExercise[]>([])
  const [currentExercises, setCurrentExercises] = useState<ArrayLike<ExerciseDataBaseExercise>>([])
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

  useEffect(() => {
    console.log("display data", exercisesDisplayed)
  }, [exercisesDisplayed])

  useEffect(() => {
    console.log("display data", currentExercises)
  }, [currentExercises])

  useEffect(() => {

  }, [currentExercises])

  const getExercisesForCategory = (categoryId: string) => {
    const category = exerciseCategories.find(cat => cat.id === categoryId);
    
    if (category) {
      console.log('category:',category)

      return category
    } else {
      return ['']
    }
  };

  const renderItem: ListRenderItem<ExerciseDataBaseCategory> = ({item}) => (
    <Button
      key={item.id}
      className="mx-1 py-0"
      mode={pressedButtonId === item.id ? "contained" : "outlined"}
      onPress={() => {
        {pressedButtonId === item.id
          ? setPressedButtonId('')
          : setPressedButtonId(item.id)};
          console.log(item.id)
          getExerciseCategoryData(setExercisesDisplayed, collection(db, 'exercsiseCategories', item.id, 'exercises'))
          getExercisesForCategory(pressedButtonId)
      }}
    >
      {item.title}
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
     <FlatList className='pb-96'
  data={currentExercises}
  keyExtractor={(item: ExerciseDataBaseExercise) => item.id}
  renderItem={({ item }) => {
    const exerciseNameKey = Object.keys(item).find(key => key !== "id");

    if(exerciseNameKey) {
    const exerciseTitle = item.exercise?.title;


    return (
      <View key={item.id}>
        <DatabaseExercise
          id={item.id}
          idOfCategory={pressedButtonId}
          exerciseName={exerciseTitle}
        />
      </View>
    );
  }else {
    return null} 
  }}
/>

    </>
  )
}

export default DatabaseCategories
