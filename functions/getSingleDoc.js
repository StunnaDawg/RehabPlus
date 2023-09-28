import { getDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetSingleDoc = async (setState, collectionRef, id) => {
  try {
    const docRef = doc(collectionRef, id) // Get the document reference.
    const docSnap = await getDoc(docRef) // Fetch the document.

    if (docSnap.exists()) {
      // Check if the document exists.
      const docId = docSnap.id
      console.log("id", docId)

      const docData = { ...docSnap.data(), id: docId }
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
