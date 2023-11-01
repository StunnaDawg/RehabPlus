import { getDoc, doc, getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"
const GetProtocolPhases = async (setState, setRefresh, collectionRef) => {
  try {
    const data = await getDocs(collectionRef)
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    console.log("filtered data get protocolPhases", filteredData)
    setState(filteredData)
    setRefresh(1000)
  } catch (err) {
    console.error(err)
  }
}

export default GetProtocolPhases
