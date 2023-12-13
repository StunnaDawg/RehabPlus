import { View, Text, ScrollView } from "react-native"
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { RouteParamsType } from "../../../@types/navigation"
import { ExerciseDataBaseExercise } from "../../../@types/firestore"
import getSingleDbExercise from "../../../functions/getSingleDbExercise"

const EditExercise = () => {
  const [exercise, setExercise] = useState<ExerciseDataBaseExercise>(
    {} as ExerciseDataBaseExercise
  )
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const navigation = useNavigation()

  const { title, id, categoryId } = route.params

  useEffect(() => {
    console.log("loading")

    const loadExercise = async () => {
      try {
        if (id && categoryId) {
          console.log("loading edit exercise Page")
          getSingleDbExercise(setExercise, id, categoryId)
        } else {
          console.log("Yo where are the IDs?")
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadExercise()
  }, [])

  return (
    <ScrollView>
      <Text className="text-4xl">{title}</Text>
      <Text>{exercise.description}</Text>
    </ScrollView>
  )
}

export default EditExercise
