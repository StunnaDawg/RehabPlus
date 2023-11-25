import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react";
import { ExerciseDataBaseCategory } from "../@types/firestore";

const getExerciseFireStoreData = async (setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseCategory[]>>, categoriesCollection: CollectionReference) => {
    try {
        const data = await getDocs(categoriesCollection)
    
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          title: doc.data().title,
          exercises: doc.data().exercises,
        }))
        console.log("filtered data get Workouts", filteredData)
        setCategoriesState(filteredData)
      } catch (err) {
        console.error(err)
      }
};
export default getExerciseFireStoreData
