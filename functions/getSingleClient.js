import { getDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH } from "../firebase"

const GetSingleClient = async (setState, collectionRef, id) => {
  try {
    if (!collectionRef || !id) {
      throw new Error("Undefined collectionRef or id");
    }
    console.log("ID:", id);
    
    const clientRef = doc(collectionRef, id);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {
      const clientData = clientSnap.data();

      if (typeof clientData !== "object" || clientData === null) {
        throw new Error("Invalid client data");
      }

      const clientId = clientSnap.id;
      const clientProtocolRef = clientSnap.protocol;

      let clientProtocolArray = [];
      if (clientProtocolRef) {
        const clientProtocolDoc = await getDoc(clientProtocolRef);

        if (clientProtocolDoc.exists()) {
          clientProtocolArray = [...clientProtocolDoc.data()];
          console.log("Clients Protocol:", clientProtocolArray);
        }
      }

      const updatedClientData = { ...clientData, id: clientId };
      console.log("Document data:", updatedClientData);
      setState(updatedClientData);
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
  }
};

export default GetSingleClient;
