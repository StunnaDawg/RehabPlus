import {
  getDoc,
  doc,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore"
import { db } from "../firebase"
import { Dispatch, SetStateAction } from "react"
import { WorkoutExercise, ExerciseDataBaseExercise } from "../@types/firestore"

const GetSingleExercise = async (
  setCategoriesState: Dispatch<SetStateAction<WorkoutExercise | undefined>>,
  exerciseId: string,
  categoryId: string
) => {
  try {
    const exerciseDoc = doc(
      db,
      "exerciseCategories",
      categoryId,
      "exercises",
      exerciseId
    )
    const docSnap = await getDoc(exerciseDoc)

    if (docSnap.data()) {
      const WorkoutExerciseData = {
        ...docSnap.data(),
        // exercise: {
        //   title: docSnap.data()?.exercise.title,
        //   description: docSnap.data()?.exercise.description,
        // },
        // categoryId: categoryId,
      } as WorkoutExercise
      console.log("getSinglExerciseData", WorkoutExerciseData)
      setCategoriesState(WorkoutExerciseData)
      console.log("filtered data get Workouts", WorkoutExerciseData)
    }

    setCategoriesState(undefined)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleExercise
