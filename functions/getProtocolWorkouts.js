import { getDoc, doc, getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetProtocolWorkouts = async (setState, collectionRef) => {
  try {
    const docRef = doc(collectionRef) // Get the document reference.
    const docSnap = await getDoc(docRef) // Fetch the document.
    let protocolData = null
    let protocolId = null

    let workoutData = null

    if (docSnap.exists()) {

      if (workoutsRef) {
        const workoutDocs = await getDoc(workoutsRef)

        if (workoutDocs.exists()) {
          workoutData = {...workoutDocs.data()}
          console.log("Workout Data:", protocolData)
        }
      }

      const docData = {
        workouts: workoutData
      }
      console.log("Document data:", docData)
      setState(docData)
    } else {
      console.log("No such document!")
    }
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolWorkouts


// for (const workout of protocolWorkouts) {
//     await addDoc(workoutsSubCollectionRef,{
//       workout,
//       userId: FIREBASE_AUTH?.currentUser?.uid,
//     } );