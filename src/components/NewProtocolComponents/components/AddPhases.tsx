import { Button } from "react-native-paper"
import{Dispatch, SetStateAction} from "react"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { useRefreshKeyContext } from "../../../context/refreshKey"

type AddPhaseButtonProps = { 
  phaseTitle: string
  phaseOutline: string
  weeksText: string
  setVisible: Dispatch<SetStateAction<boolean>>
  protocolOutline: string
  protocolTitle: string
  protocolPublic: boolean
}

const AddPhaseButton = ({phaseTitle, phaseOutline, weeksText, setVisible, protocolOutline, protocolTitle, protocolPublic}: AddPhaseButtonProps) => {
    const {newProtocolData, setNewProtocolData} = useNewProtocolDataContext()
    const {setRefreshKey} = useRefreshKeyContext()
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
      <Button onPress={async () => {await onSubmitPhase(); setRefreshKey(true); setVisible(false)}}>Add Phase</Button>
    </>
  )
}

export default AddPhaseButton
