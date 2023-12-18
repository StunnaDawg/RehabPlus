import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useSingleEditProtocolContext } from "../../context/protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import { ProtocolPhase, Workout } from "../../@types/firestore"
import GetProtocolPhases from "../../functions/getProtocolPhases"
import ViewPhaseCard from "./components/ViewPhaseCard"
import { Button } from "react-native-paper"

const ViewPhases = () => {
  const [phasesData, setPhasesData] = useState<ProtocolPhase[] | undefined>()
  const [buttonId, setButtonId] = useState<string>("")
  const { protocolEditData } = useSingleEditProtocolContext()
  const phasesCollectionRef = collection(
    db,
    "protocols",
    protocolEditData.id,
    "phases"
  )

  useEffect(() => {
    const setPhases = async () => {
      //gets phases need to change the name of the function
      await GetProtocolPhases(setPhasesData, phasesCollectionRef)
    }
    setPhases()
    console.log("phases data", phasesData)
  }, [])

  return (
    <>
      <Text className="text-2xl m-5 font-bold">Protocol Overview</Text>
      <Text className="text-2xl m-3 font-bold">Phases:</Text>
      <View className="flex flex-row justify-evenly">
        {phasesData?.map((phase: ProtocolPhase) => (
          <>
            <View>
              <Button
                mode={phase.id === buttonId ? "contained" : "outlined"}
                onPress={() => setButtonId(phase.id)}
              >
                {phase.title}
              </Button>
            </View>
          </>
        ))}
      </View>
      <View className="flex flex-row justify-center">
        {phasesData?.map((phase: ProtocolPhase) => (
          <ViewPhaseCard
            key={phase.id}
            buttonChange={buttonId}
            title={phase.title}
            id={phase.id}
            description={phase.description}
            protoclId={protocolEditData.id}
          />
        ))}
      </View>
    </>
  )
}

export default ViewPhases
