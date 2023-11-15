import { getDocs, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { ProtocolPhase } from "../@types/firestore"
import { useRefreshKeyContext } from "../context/refreshKey"

const GetProtocolPhases = async (
  setState: Dispatch<SetStateAction<ProtocolPhase[] | undefined>>,
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
    console.log("filtered data get protocolPhases", filteredData)
    setState(filteredData)
    setRefreshKey(true)
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolPhases
