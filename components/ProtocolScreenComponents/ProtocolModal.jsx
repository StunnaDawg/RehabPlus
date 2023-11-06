import { Modal } from "react-native-paper"

import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import PhasesWidget from "./components/PhasesWidget"
import { useCurrentPhasesContext } from "../../context/phasesAddContext"
import { useNavigation } from "@react-navigation/native"

const ProtocolModal = ({ protocolId, protocolTitle, protocolOutline }) => {
  const [phasesData, setPhasesData] = useState([])
  const phasesCollectionRef = collection(db, "protocols", protocolId, "phases")
  const navigation = useNavigation()

  useEffect(() => {
    const setPhases = async () => {
      await GetProtocolWorkouts(setPhasesData, phasesCollectionRef)
    }
    setPhases()
    console.log("phases data", phasesData)
  }, [])

  return (
    <View>
      <Text className="text-3xl">{protocolTitle}</Text>
      <Text className="text-lg"> {protocolOutline}</Text>
        {phasesData.map((phase) => {
            console.log('phase', phase.title)
          return (
            <View key={phase.id} className='my-3'>
            <PhasesWidget
              phaseTitle={phase.title}
              phaseId={phase.id}
            />
            </View>
          )
        })
      }
    </View>
  )
}

export default ProtocolModal
