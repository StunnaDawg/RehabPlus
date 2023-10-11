import { getDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetSingleExercise = async (collectionRef, id) => {
  try {
    const docRef = doc(db, 'exerciseCategories', id) // Get the document reference.
    const docSnap = await getDoc(docRef) // Fetch the document.
    let protocolData = null
    let spreadProtocolData = null
    let protocolId = null

    if (docSnap.exists()) {
      const clientData = { ...docSnap.data() }
      // Check if the document exists.
      const docId = docSnap.id
      const protocolRef = clientData.protocol

      if (protocolRef) {
        // Fetch the document the reference is pointing to
        const protocolDoc = await getDoc(protocolRef)

        if (protocolDoc.exists()) {
          // If the document exists, access the data here
          protocolData = protocolDoc.data()
          protocolId = protocolDoc.id
          console.log("Protocol Data:", protocolData)
        }
      }
      //   console.log("id", docId)

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

export default GetSingleExercise
