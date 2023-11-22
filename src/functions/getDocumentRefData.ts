import { DocumentReference, getDoc, DocumentData } from "firebase/firestore"

const getDocumentRefData = async (ref: DocumentReference<DocumentData> | undefined) => {
    
    if(ref) {
    const refSnapShot = await getDoc(ref)

    if(refSnapShot.exists()) {
        console.log('protocol title', refSnapShot.data())
        return refSnapShot.data()
    } else {
       return undefined
    }
} 

return undefined
}

export default getDocumentRefData