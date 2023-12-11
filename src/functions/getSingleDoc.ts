import { getDoc, doc, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { Protocol } from "../@types/firestore"

const GetSingleDoc = async (
  setState: Dispatch<SetStateAction<Protocol>>,
  collectionRef: CollectionReference,
  id: string
) => {
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
        title: clientData.title,
      } as Protocol
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
