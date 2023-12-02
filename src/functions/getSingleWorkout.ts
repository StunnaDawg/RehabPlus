import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { Dispatch, SetStateAction } from "react"
import { Workout } from "../@types/firestore"

const GetSingleWorkout = async (
  workoutId: string,
  protocolId: string,
  setState: Dispatch<SetStateAction<Workout | undefined>>,
  phaseId: string
) => {
  try {
    const workoutDocRef = doc(
      db,
      "protocols",
      protocolId,
      "phases",
      phaseId,
      "workouts",
      workoutId
    ) // Get the document reference.
    const docSnap = await getDoc(workoutDocRef) // Fetch the document.
    const docId = workoutId

    const workoutData = {
      ...docSnap.data(),
      workout: docSnap.data()?.workout,
    }
    console.log("workout id filtered", workoutId)
    console.log("Document data for Workout:", workoutData)
    setState(workoutData)
  } catch (err) {
    console.error(err)
  }
}

export default GetSingleWorkout
