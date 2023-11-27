import { getDocs, CollectionReference, collection, doc } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react";
import { ExerciseDataBaseExercise } from "../@types/firestore";
import { db } from "../firebase";

const getExerciseCategoryData = async (setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>, categoriesCollectionId: string) => {
    try {
        console.log('Collection id', categoriesCollectionId)
        const category = doc(db, 'exerciseCategories', categoriesCollectionId)
        const categoriesCollection = collection(category, 'exercises')
        const data = await getDocs(categoriesCollection)
    
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
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
