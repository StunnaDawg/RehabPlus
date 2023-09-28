import { getDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetSingleDoc = async (setState, collectionRef, id) => {
    
        try {
          const docRef = doc(collectionRef, id); // Get the document reference.
          const docSnap = await getDoc(docRef); // Fetch the document.
      
          if (docSnap.exists()) { // Check if the document exists.
            console.log("Document data:", docSnap.data());
            const docData = docSnap.data()
            setState(docData)
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.error(err);
        }
    }

export default GetSingleDoc