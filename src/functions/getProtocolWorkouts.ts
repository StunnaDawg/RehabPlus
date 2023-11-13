import { CollectionReference, getDocs } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { Workout } from "../@types/firestore"

// Can get Phases too
const GetProtocolWorkouts = async (setState: Dispatch<SetStateAction<Workout>>, collectionRef: CollectionReference) => {
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
