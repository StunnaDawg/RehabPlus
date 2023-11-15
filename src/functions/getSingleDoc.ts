import { getDoc, doc, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { Protocol } from "../@types/firestore"

// Find out the type of the data that is being fetched.
type AddClientProtocol = {

}

const GetSingleDoc = async (setState: Dispatch<SetStateAction<AddClientProtocol | Protocol>>, collectionRef: CollectionReference, id: string) => {
  try {
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    let protocolData = null
    let protocolId = null

    if (docSnap.exists()) {
      const clientData = { ...docSnap.data() }
   
      const docId = docSnap.id
      const protocolRef = clientData.protocol

      if (protocolRef) {
        const protocolDoc = await getDoc(protocolRef)

        if (protocolDoc.exists()) {
         
          protocolData = protocolDoc.data()
          protocolId = protocolDoc.id
          console.log("Protocol Data:", protocolData)
        }
      }

      const docData = {
        ...clientData,
        id: docId,
        clientProtocol: protocolData,
        clientProtocolId: protocolId,
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

export default GetSingleDoc
