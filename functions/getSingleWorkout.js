import { getDoc, doc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../firebase"

const GetSingleWorkout = async (workoutId, protocolId, setState) => {
  try {
    const workoutDocRef = doc(db, 'protocols', protocolId, 'workouts', workoutId) // Get the document reference.
    const docSnap = await getDoc(workoutDocRef) // Fetch the document.

      const workoutData = {
        ...docSnap.data()
      }
      console.log("Document data:", workoutData)
      setState(workoutData)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleWorkout