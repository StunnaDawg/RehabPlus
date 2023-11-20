import { View, Text } from "react-native"
import React, { useState } from "react"
import PhasesWidget from "./components/PhasesWidget"
import { Protocol, ProtocolPhase } from "../../@types/firestore"

const ProtocolModal = ({ id: protocolId, title: protocolTitle, description: protocolOutline }: Protocol) => {
  const [phasesData, setPhasesData] = useState<ProtocolPhase[]>([])


  return (
    <View>
      <Text className="text-3xl">{protocolTitle}</Text>
      <Text className="text-lg"> {protocolOutline}</Text>
        {phasesData.map((phase) => {
            console.log('phase', phase.title)
          return (
            <View key={phase.id} className='my-3'>
            <PhasesWidget
              title={phase.title}
              id={phase.id}
              userId={phase.userId}
            />
            </View>
          )
        })
      }
    </View>
  )
}

export default ProtocolModal
