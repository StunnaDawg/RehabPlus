import { doc, getDoc } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { ExerciseDataBaseExercise } from "../@types/firestore"
import { db } from "../firebase"

const getSingleDbExercise = async (
  setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseExercise>>,
  exerciseId: string,
  categoriesCollectionId: string
) => {
  try {
    console.log("Collection id", categoriesCollectionId)
    const category = doc(db, "exerciseCategories", categoriesCollectionId)
    const exercise = doc(category, "exercises", exerciseId)
    const data = await getDoc(exercise)

    if (data.exists()) {
      const docData = { ...data.data() }

      const filteredData = {
        ...docData,
        id: data.id,
        title: docData.title,
        description: docData.description,
        imageUrl: docData.imageUri,
      } as ExerciseDataBaseExercise

      console.log("filtered data get Category Exercises", data)
      setCategoriesState(filteredData)
    } else {
      console.log("exercise does not exist")
    }
  } catch (err) {
    console.error(err)
  }
}
export default getSingleDbExercise
