
import { getDocs } from "firebase/firestore"

const getFireStoreData = async (setState, collection) => {
      try {
        const data = await getDocs(collection)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        console.log(filteredData)
        setState(filteredData)
      } catch (err) {
        console.error(err)
      }
    }

export default getFireStoreData