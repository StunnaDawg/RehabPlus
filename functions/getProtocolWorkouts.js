import { getDoc, doc, getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetProtocolWorkouts = async (setState, collectionRef) => {
    try {
        const data = await getDocs(collectionRef)
        const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
        }))
        console.log(filteredData)
        setState(filteredData)
      } catch (err) {
        console.error(err)
      }
    }

export default GetProtocolWorkouts


// for (const workout of protocolWorkouts) {
//     await addDoc(workoutsSubCollectionRef,{
//       workout,
//       userId: FIREBASE_AUTH?.currentUser?.uid,
//     } );