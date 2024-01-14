import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { ExerciseDataBaseExercise } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getAllExerciseCategoryData = async (
  setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>
) => {
  try {
    const category = collection(db, "exerciseCategories")
    const data = await getDocs(category)

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      imageUrl: doc.data().imageUri,
    }))
    console.log("filtered data get Category Exercises", filteredData)
    setCategoriesState(filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default getAllExerciseCategoryData
