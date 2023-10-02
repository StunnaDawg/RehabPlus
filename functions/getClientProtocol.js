import { getDoc } from "firebase/firestore"

export const protocolRefClient = async (clientData) => {
    try {
    if (clientData && clientData.protocol) {
      const protocolRef = clientData.protocol
      const protocolDoc = await getDoc(protocolRef)
      if (protocolDoc.exists) {
        console.log("Protocol data:", protocolDoc.data())
      }
    }
  } catch(err) {
    console.error(err)
  }
}