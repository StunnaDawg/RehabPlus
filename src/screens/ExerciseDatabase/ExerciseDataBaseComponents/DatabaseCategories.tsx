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
  categoryId: string
}

const DatabaseCategories = ({
  setSearchTriggerProp,
  allCategories,
  categoryId,
}: DatabaseCategoriesProps) => {
  const [exercisesDisplayed, setExercisesDisplayed] = useState<
    ExerciseDataBaseExercise[]
  >([])
  const [currentExercises, setCurrentExercises] = useState<
    ExerciseDataBaseExercise[]
  >([])
  const [searchTriggered, setSearchTrigger] = useState<boolean>(false)
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   console.log("database data", ...exerciseCategories)
  // }, [exerciseCategories])

  useEffect(() => {
    console.log("display data", exercisesDisplayed)
  }, [exercisesDisplayed])

  useEffect(() => {
    if (allCategories === false && categoryId !== "") {
      try {
        getExerciseCategoryData(setExercisesDisplayed, categoryId)
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        getAllExerciseCategoryData(
          setExercisesDisplayed,
          setCurrentExercises,
          currentExercises
        )
      } catch (err) {
        console.error(err)
      }
    }
  }, [categoryId])

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
