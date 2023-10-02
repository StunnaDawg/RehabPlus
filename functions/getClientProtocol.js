import { getDoc } from "firebase/firestore"

export const protocolRefClient = async (clientData, setClientState) => {
    try {
    if (clientData && clientData.protocol) {
      const protocolRef = clientData.protocol
      const protocolDoc = await getDoc(protocolRef)
      if (protocolDoc.exists()) {
        const protocolData = [protocolDoc.data()]
        console.log('Clients Protocol:', protocolData)
        setClientState(protocolData)
      }
    }
  } catch(err) {
    console.error(err)
  }
}