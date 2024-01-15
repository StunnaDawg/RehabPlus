import { View, FlatList, ListRenderItem, ScrollView } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Text } from "react-native-paper"
import DatabaseExercise from "./DatabaseExercise"
import getExerciseFireStoreData from "../../../functions/getExerciseData"
import { db } from "../../../firebase"
import { useIsFocused } from "@react-navigation/native"
import { collection } from "firebase/firestore"
import {
  ExerciseDataBaseCategory,
  ExerciseDataBaseExercise,
} from "../../../@types/firestore"
import getExerciseCategoryData from "../../../functions/getExerciseCategoriesData"
import getAllExerciseCategoryData from "../../../functions/getAllExerciseCategoryData"

type DatabaseCategoriesProps = {
  setSearchTriggerProp: Dispatch<SetStateAction<boolean>>
  allCategories: boolean
  categoryId?: string
}

const DatabaseCategories = ({
  setSearchTriggerProp,
  allCategories,
  categoryId,
}: DatabaseCategoriesProps) => {
  const [exerciseCategories, setExerciseCategories] = useState<
    ExerciseDataBaseCategory[]
  >([])
  const [exercisesDisplayed, setExercisesDisplayed] = useState<
    ExerciseDataBaseExercise[]
  >([])

  const [allExercisesDisplayed, setAllExercisesDisplayed] = useState<
    ExerciseDataBaseExercise[]
  >([])
  const [currentExercises, setCurrentExercises] = useState<
    ArrayLike<ExerciseDataBaseExercise>
  >([])
  const [searchTriggered, setSearchTrigger] = useState<boolean>(false)
  const exercisesCollectionRef = collection(db, "exerciseCategories")
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   console.log("database data", ...exerciseCategories)
  // }, [exerciseCategories])

  useEffect(() => {
    console.log("display data", exercisesDisplayed)
  }, [exercisesDisplayed])

  useEffect(() => {
    if (allCategories === false && categoryId) {
      try {
        getExerciseCategoryData(setExercisesDisplayed, categoryId)
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        getAllExerciseCategoryData(setExercisesDisplayed)
      } catch (err) {
        console.error(err)
      }
    }
  }, [allCategories])

  return (
    <>
      <ScrollView>
        {exercisesDisplayed.map((exercises) => (
          <View>
            <Text>{exercises.id}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  )
}

export default DatabaseCategories
