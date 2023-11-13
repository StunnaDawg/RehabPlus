import { getDoc, doc} from "firebase/firestore"
import { db } from "../firebase"
import { Dispatch, SetStateAction } from "react"
import { WorkoutExercise } from "../@types/firestore"

const GetSingleExercise = async (id: string, categoryId: string, setState: Dispatch<SetStateAction<WorkoutExercise | undefined>>) => {
  try {
    const exerciseDocRef = doc(db, 'exerciseCategories', categoryId, 'exercises', id) // Get the document reference.
    const docSnap = await getDoc(exerciseDocRef) // Fetch the document.

      if (docSnap.exists()) {
        const exerciseData: WorkoutExercise = {
          ...(docSnap.data() as WorkoutExercise), // Cast the data to WorkoutExercise
        };
        console.log("Document data for exercises:", exerciseData)
      setState(exerciseData)
      } else {
        console.log("No such document!")
        setState(undefined)
      }
      
  } catch (err) {
    console.error(err)
    setState(undefined)
  }
}

export default GetSingleExercise
