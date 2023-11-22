import { getDocs, getDoc, CollectionReference } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"
import { Dispatch, SetStateAction } from "react";
import { Client } from "../@types/firestore";

const getClientFireStoreData = async (setState: Dispatch<SetStateAction<Client[]>>, collection: CollectionReference) => {
  try {
    const data = await getDocs(collection);
    const clientData = data.docs
      .filter(doc => doc.data().userId === FIREBASE_AUTH?.currentUser?.uid);

    // Now map this back to your client data.
    const filteredData = clientData.map((doc) => 
      ({
      ...doc.data(),
      id: doc.id,
      email: doc.data().email,
      injuryDescription: doc.data().injury,
      name: doc.data().name,
      status: doc.data().status,
      userId: doc.data().userId,
      protocol: doc.data().protocol
    })) as Client[];

    console.log('protocol data', filteredData)
    setState(filteredData);
  } catch (err) {
    console.error(err);
  }
};
export default getClientFireStoreData