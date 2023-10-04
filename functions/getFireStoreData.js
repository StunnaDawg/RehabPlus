
import { getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const getFireStoreData = async (setState, collection) => {
      try {
        const data = await getDocs(collection)
        const filteredData = data.docs
        .filter(doc => doc.data().userId === FIREBASE_AUTH?.currentUser?.uid)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          protocol: doc.protocol
        }))
        setState(filteredData)
      } catch (err) {
        console.error(err)
      }
    }

export default getFireStoreData