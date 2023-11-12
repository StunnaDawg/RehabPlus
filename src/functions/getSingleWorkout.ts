import { getDoc, doc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../firebase"

const GetSingleWorkout = async (workoutId, protocolId, setState, phaseId) => {
  try {
    const workoutDocRef = doc(db, 'protocols', protocolId ,'phases', phaseId, 'workouts', workoutId, ) // Get the document reference.
    const docSnap = await getDoc(workoutDocRef) // Fetch the document.
    const docId = workoutId

      const workoutData = {
        id: docId,
        ...docSnap.data(),
        
      }
      console.log('workout id filtered', workoutId)
      console.log("Document data for Workout:", workoutData)
      setState(workoutData)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleWorkout