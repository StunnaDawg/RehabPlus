import { getDoc, doc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../firebase"

const GetSingleExercise = async (id, categoryId, setState) => {
  try {
    const exerciseDocRef = doc(db, 'exerciseCategories', categoryId, 'exercises', id) // Get the document reference.
    const docSnap = await getDoc(exerciseDocRef) // Fetch the document.

      const exerciseData = {
        ...docSnap.data()
      }
      console.log("Document data for exercises:", exerciseData)
      setState(exerciseData)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleExercise
