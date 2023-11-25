import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react";
import { ExerciseDataBaseExercise } from "../@types/firestore";

const getExerciseCategoryData = async (setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>, categoriesCollection: CollectionReference) => {
    try {
        const data = await getDocs(categoriesCollection)
    
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        //   exercise: doc.data().exercises
          exercise: {
            title: doc.data().title,
            description: doc.data().description
          }
        }))
        console.log("filtered data get Category Exercises", filteredData)
        setCategoriesState(filteredData)
      } catch (err) {
        console.error(err)
      }
};
export default getExerciseCategoryData
