import { Button } from "react-native-paper"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { useRefreshKeyContext } from "../../../context/refreshKey"

type AddPhaseButtonProps = {
  phaseTitle: string
  phaseOutline?: string
  weeksText?: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  protocolOutline?: string
  protocolTitle?: string
  protocolPublic: boolean
  protocolId: string
}

const AddPhaseButton = ({
  phaseTitle,
  phaseOutline,
  weeksText,
  setVisible,
  protocolPublic,
  protocolOutline,
  protocolTitle,
  protocolId,
}: AddPhaseButtonProps) => {
  const protocolsDocRef = doc(db, "protocols", protocolId)
  const { setRefreshKey } = useRefreshKeyContext()
  const phasesCollectionRef = collection(db, "protocols", protocolId, "phases")
  const onSubmitPhase = async () => {
    try {
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
        public: protocolPublic,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Button
        onPress={async () => {
          await onSubmitPhase()
          setRefreshKey(true)
          setVisible(false)
        }}
      >
        Add Phase
      </Button>
    </>
  )
}

export default AddPhaseButton
