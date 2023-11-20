import { getDocs, getDoc, CollectionReference } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"
import { Dispatch, SetStateAction } from "react";
import { Client } from "../@types/firestore";

const getClientFireStoreData = async (setState: Dispatch<SetStateAction<Client[]>>, collection: CollectionReference) => {
  try {
    const data = await getDocs(collection);
    const clientData = data.docs
      .filter(doc => doc.data().userId === FIREBASE_AUTH?.currentUser?.uid);

    // Fetch all the valid protocol references in one go.
    const validProtocolRefs = clientData
      .map(doc => doc.data().protocol)
      .filter(ref => ref && typeof ref === 'object');
    const protocolDocs = await Promise.all(validProtocolRefs.map(ref => getDoc(ref)));

    // Convert protocolDocs to an array of data.
    const protocolsData = protocolDocs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Now map this back to your client data.
    const filteredData = clientData.map((doc, index) => ({
      ...doc.data(),
      id: doc.id,
      email: doc.email,
      injury: doc.data().injury,
      name: doc.data().name,
      status: doc.data().status,
      userId: doc.data().userId,
      protocol: protocolsData[index] ? { ...protocolsData[index] } : null
    }));

    setState(filteredData);
  } catch (err) {
    console.error(err);
  }
};
export default getClientFireStoreData