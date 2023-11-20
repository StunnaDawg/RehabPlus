import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { Workout } from "../@types/firestore"
import { useRefreshKeyContext } from "../context/refreshKey"

const GetWorkouts = async (
  setState: Dispatch<SetStateAction<Workout[] | undefined>>,
  collectionRef: CollectionReference
) => {
  try {
    const { setRefreshKey } = useRefreshKeyContext()
    const data = await getDocs(collectionRef)

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      userId: doc.data().userId,
    }))
    console.log("filtered data get Workouts", filteredData)
    setState(filteredData)
    setRefreshKey(true)
  } catch (err) {
    console.error(err)
  }
}

export default GetWorkouts