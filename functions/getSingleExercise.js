import { getDoc, doc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../firebase"

const GetSingleExercise = async (id, categoryId, setState) => {
  try {
    const exerciseDocRef = doc(db, 'exerciseCategories', categoryId, 'exercises', id) // Get the document reference.
    const docSnap = await getDoc(exerciseDocRef) // Fetch the document.

    // let exerciseFetchedData = null
    // let exerciseId = null

    // if (docSnap.exists()) {
    //   const exerciseData = { ...docSnap.data() }
    //   // Check if the document exists.
    //   const docId = docSnap.id
    //   const exerciseRef = exerciseData.protocol

    //   if (exerciseRef) {
    //     // Fetch the document the reference is pointing to
    //     const exerciseDoc = await getDoc(exerciseRef)

    //     if (exerciseDoc.exists()) {
    //       // If the document exists, access the data here
    //       exerciseFetchedData = exerciseDoc.data()
    //       exerciseId = exerciseDoc.id
    //       console.log("Exercise Widget Data:", exerciseFetchedData)
    //     }
    //   }
      //   console.log("id", docId)

      const exerciseData = {
        ...docSnap.data()
      }
      console.log("Document data:", exerciseData)
      setState(exerciseData)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleExercise
