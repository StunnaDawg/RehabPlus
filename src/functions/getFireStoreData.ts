import { CollectionReference, getDocs } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"
import { Dispatch, SetStateAction } from "react"
import { Protocol } from "../@types/firestore"

const getFireStoreData = async (
  setState: Dispatch<SetStateAction<Protocol[] | undefined>>,
  collectionRef: CollectionReference
) => {
  try {
    const data = await getDocs(collectionRef)
    const filteredData = data.docs
      .filter(
        (doc) =>
          doc.data().userId === FIREBASE_AUTH?.currentUser?.uid ||
          doc.data().public === true
      )
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
        description: doc.data()?.description,
        title: doc.data()?.title,
        userId: doc.data()?.userId,
        weeks: doc.data()?.weeks,
        public: doc.data()?.public,
        imageUri: doc.data()?.imageUri,
      })) as Protocol[]

    setState(filteredData)
  } catch (err) {
    console.error(err)
  }
}

export default getFireStoreData
