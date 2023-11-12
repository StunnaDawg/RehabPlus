import { getDoc, doc, getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

// Can get Phases too
const GetProtocolWorkouts = async (setState, collectionRef) => {
  try {
    const data = await getDocs(collectionRef)
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    console.log("filtered data phases workouts", filteredData)
    setState(filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolWorkouts
