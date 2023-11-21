import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { ProtocolPhase } from "../@types/firestore"

const GetProtocolPhases = async (
  setState: Dispatch<SetStateAction<ProtocolPhase[] | undefined>>,
  collectionRef: CollectionReference
) => {
  try {
    const data = await getDocs(collectionRef)

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      userId: doc.data().userId,
    }))
    console.log("filtered data get protocolPhases", filteredData)
    setState(filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolPhases
