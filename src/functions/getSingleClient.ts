import { getDoc, doc, CollectionReference } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { Client } from "../@types/firestore"

const GetSingleClient = async (
  setState: Dispatch<SetStateAction<Client>>,
  collectionRef: CollectionReference,
  id: string
) => {
  try {
    const docRef = doc(collectionRef, id)
    const docSnap = await getDoc(docRef)
    console.log("i got here")

    if (docSnap.exists()) {
      console.log("we got this far")
      const clientData = { ...docSnap.data() }

      const docId = docSnap.id

      const docData = {
        ...clientData,
        id: docId,
        email: clientData?.email,
        injuryDescription: clientData?.injuryDescription,
        name: clientData.name,
        protocol: clientData?.protocol,
        status: clientData.status,
        userId: clientData.userId,
      }
      console.log("Document data:", docData)
      setState(docData)
    } else {
      console.log("No such document!")
    }
  } catch (err) {
    console.log("error getting client data")
    console.error(err)
  }
}

export default GetSingleClient
