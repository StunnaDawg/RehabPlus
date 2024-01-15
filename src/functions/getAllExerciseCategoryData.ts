import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import {
  ExerciseDataBaseCategory,
  ExerciseDataBaseExercise,
} from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getAllExerciseCategoryData = async (
  setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseCategory[]>>
) => {
  try {
    const category = collection(db, "exerciseCategories")
    const data = await getDocs(category)

    const filteredData = data.docs.map((doc) => ({
      ...doc.data().exercises,
      id: doc.id,
      title: doc.data().exercises.title,
      description: doc.data().exercises.description,
      imageUrl: doc.data().exercises.imageUri,
    }))
    console.log("filtered data get Category Exercises", filteredData)
    setCategoriesState(filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default getAllExerciseCategoryData
