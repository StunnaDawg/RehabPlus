import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import {
  ExerciseDataBaseCategory,
  ExerciseDataBaseExercise,
} from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"
import getExerciseCategoryData from "./getExerciseCategoriesData"

const getAllExerciseCategoryData = async (
  setExercises: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>,
  setCurrExercise: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>,
  currExercise: ExerciseDataBaseExercise[]
) => {
  try {
    const category = collection(db, "exerciseCategories")
    const data = await getDocs(category)

    const filteredData = data.docs.map(
      (doc) => getExerciseCategoryData(setCurrExercise, doc.id),
      setExercises((prev) => [...prev, ...currExercise])
    )

    console.log("filtered data get Category Exercises", filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default getAllExerciseCategoryData
