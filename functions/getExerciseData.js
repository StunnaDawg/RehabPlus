import { getDocs, getDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const getExerciseFireStoreData = async (setCategoriesState, categoriesCollection) => {
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
