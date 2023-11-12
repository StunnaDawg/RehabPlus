import { Button } from "react-native-paper"
import { usePhasesContext } from "../../../context/phasesAddContext"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useNewProtocolContext } from "../../../context/newProtocolContext"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { useRefreshContext } from "../../../context/refreshKey"

const AddPhaseButton = ({phaseTitle, phaseOutline, weeksText, setVisible, protocolOutline, protocolTitle, protocolPublic}) => {
    const [newProtocolData, setNewProtocol] = useNewProtocolContext()
    const [refreshKey, setRefreshKey] = useRefreshContext()
    const protocolsDocRef = doc(db, "protocols", newProtocolData.id)
      const phasesCollectionRef = collection(db, "protocols", newProtocolData.id, 'phases' )
      const onSubmitPhase = async () => {
          try{
           await addDoc(phasesCollectionRef, {
              title: phaseTitle,
              description: phaseOutline,
              weeks: weeksText,
              userId: FIREBASE_AUTH?.currentUser?.uid,
          })

          await updateDoc(protocolsDocRef, {
            title: protocolTitle,
            description: protocolOutline,
            userId: FIREBASE_AUTH?.currentUser?.uid,
            public: protocolPublic
        })
          
      } catch(err) {
        console.error(err)
      }
    
    }


  return (
    <>
      <Button onPress={async () => {await onSubmitPhase(); setRefreshKey(+1); setVisible(false)}}>Add Phase</Button>
    </>
  )
}

export default AddPhaseButton
