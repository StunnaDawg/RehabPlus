import { Modal } from "react-native-paper"

import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"

const ProtocolModal = ({ protocolId, protocolTitle, protocolOutline }) => {
    const [phasesData, setPhasesData] = useState([])
    const phasesCollectionRef = collection(db, "protocols", protocolId, "phases")
    
    useEffect(() => {
        const setPhases = async () => {
        await GetProtocolWorkouts(
            setPhasesData,
            phasesCollectionRef,
          )
        }
        setPhases()
        console.log('phases data', phasesData)
    }, [])
  return (
    <View>
      <Text>ProtocolTitle: {protocolTitle}</Text>
      <Text>ProtocolModal: id {protocolId}</Text>
      <Text>ProtocolModal: outline {protocolOutline}</Text>
    {phasesData.map((phase) => {
        return (
            <View key={phase.id}>
                <Text>Phase Title: {phase.title}</Text>
                <Text>Phase Description: {phase.description}</Text>
                <Text>Phase Id: {phase.id}</Text>
            </View>
        )
    })
}
    </View>
  )
}

export default ProtocolModal
