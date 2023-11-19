import { getDocs, collection, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react";
import { ExerciseDataBaseExercise } from "../@types/firestore";

const getExerciseFireStoreData = async (setCategoriesState: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>, categoriesCollection: CollectionReference) => {
    try {
        const exerciseFireBaseData = await getDocs(categoriesCollection);
        const exerciseData = exerciseFireBaseData.docs;

        const categoriesWithExercises = await Promise.all(
            exerciseData.map(async (categoryDoc) => {
                const exercisesCollection = collection(categoriesCollection, categoryDoc.id, "exercises");
                const exercisesSnap = await getDocs(exercisesCollection);
                const exercisesData = exercisesSnap.docs.map(exerciseDoc => ({
                    ...exerciseDoc.data(),
                    id: exerciseDoc.id
                }));
                console.log('Exercises for category:', categoryDoc.data().title, exercisesData);
                return {
                    ...categoryDoc.data(),
                    id: categoryDoc.id,
                    exercises: exercisesData
                };
            })
        );

        console.log('filtered exercise data:', categoriesWithExercises);
        setCategoriesState(categoriesWithExercises);

    } catch (err) {
        console.error("The error is", err);
    }
};
export default getExerciseFireStoreData
