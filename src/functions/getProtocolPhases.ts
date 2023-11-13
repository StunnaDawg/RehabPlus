import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"

const GetProtocolPhases = async (
  setState: Dispatch<SetStateAction<string>>,
  setRefresh: Dispatch<SetStateAction<boolean>>,
  collectionRef: CollectionReference
) => {
  try {
    const data = await getDocs(collectionRef)

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    console.log("filtered data get protocolPhases", filteredData)
    setState(filteredData)
    setRefresh(true)
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolPhases
