import { DocumentReference, getDoc, DocumentData } from "firebase/firestore"

const getDocumentRefData = async (ref: DocumentReference<DocumentData>) => {
    
    if(ref) {
    const refSnapShot = await getDoc(ref)


    if(refSnapShot.exists()) {
        console.log('protocol title', refSnapShot.data())
        return refSnapShot.data()
    }
} 
}

export default getDocumentRefData