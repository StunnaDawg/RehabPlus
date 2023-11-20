import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useSingleEditProtocolContext } from "../context/protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../firebase"
import { ProtocolPhase } from "../@types/firestore"
import GetProtocolPhases from "../functions/getProtocolPhases"

const ViewPhases = () => {
  const [phasesData, setPhasesData] = useState<ProtocolPhase[] | undefined>()
  const {protocolEditData} = useSingleEditProtocolContext()
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
    <View>
        <Text className='text-2xl m-5 font-bold'>Protocol Overview</Text>
        <Text className='text-2xl m-3 font-bold'>Phases:</Text>
 
      {phasesData?.map((phase: ProtocolPhase) => (
        <View className='p-2 m-5'>
       <Text onPress={() => console.log('ss')} >{phase.title}</Text>
       </View>
      ))} 
    </View>
  )
}

export default ViewPhases
