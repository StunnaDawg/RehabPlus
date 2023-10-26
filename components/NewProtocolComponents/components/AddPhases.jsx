import { Button } from "react-native-paper"
import { usePhasesContext } from "../../../context/phasesAddContext"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useNewProtocolContext } from "../../../context/newProtocolContext"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { useRefreshContext } from "../../../context/refreshKey"

const AddPhaseButton = ({phaseTitle, phaseOutline, weeksText, setVisible}) => {
    const [newProtocolData, setNewProtocol] = useNewProtocolContext()
    const [refreshKey, setRefreshKey] = useRefreshContext()
      const phasesCollectionRef = collection(db, "protocols", newProtocolData.id, 'phases' )
      const onSubmitPhase = async () => {
          try{
           await addDoc(phasesCollectionRef, {
              title: phaseTitle,
              description: phaseOutline,
              userId: FIREBASE_AUTH?.currentUser?.uid,
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
