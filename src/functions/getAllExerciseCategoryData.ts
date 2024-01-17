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
    setExercises([])
    const category = collection(db, "exerciseCategories")
    const data = await getDocs(category)
    let gottenData: ExerciseDataBaseExercise[] = []

    data.docs.map(
      (doc) => getExerciseCategoryData(setCurrExercise, doc.id),
      gottenData.push(currExercise[0])
    )

    setExercises(gottenData)

    console.log("filtered data get Category Exercises", gottenData)
  } catch (err) {
    console.error(err)
  }
}

export default getAllExerciseCategoryData
