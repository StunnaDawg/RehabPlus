import { getDocs, getDoc } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const getExerciseFireStoreData = async (setState, collection) => {
    try {
      const exerciseFireBaseData = await getDocs(collection);
      const exerciseData = exerciseFireBaseData.docs
      //   .filter(doc => doc.data().userId === FIREBASE_AUTH?.currentUser?.uid);
      const filteredData = exerciseData.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('filtered exercise data:', filteredData)
      setState(filteredData);
    } catch (err) {
      console.error("The error is", err);
    }
  };
  export default getExerciseFireStoreData