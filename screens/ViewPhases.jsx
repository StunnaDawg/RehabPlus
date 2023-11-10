import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useCurrentPhasesContext } from "../context/phasesAddContext"
import { useSingleProtocolContext } from "../context/protocolContext"
import { useNavigation } from "@react-navigation/native"
import { collection } from "firebase/firestore"
import { db } from "../firebase"
import GetProtocolWorkouts from "../functions/getProtocolWorkouts"
import { Button, List } from "react-native-paper"

const ViewPhases = () => {
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext("")
  const [phasesData, setPhasesData] = useState([])
  const [protocolEditData, setProtocolEditData] = useSingleProtocolContext()
  const [currentPhasesWorkouts, setCurrentPhasesWorkouts] = useState([])
  const navigation = useNavigation()
  const phasesCollectionRef = collection(
    db,
    "protocols",
    protocolEditData.id,
    "phases"
  )

  useEffect(() => {
    const setPhases = async () => {
      //gets phases need to change the name of the function
      await GetProtocolWorkouts(setPhasesData, phasesCollectionRef)
    }
    setPhases()
    console.log("phases data", phasesData)
  }, [])

  return (
    <View>
        <Text className='text-2xl m-5 font-bold'>Protocol Overview</Text>
        <Text className='text-2xl m-3 font-bold'>Phases:</Text>
 
      {phasesData.map((phase) => (
        <View className='p-2 m-5'>
       <Text onPress={() => console.log('ss')} >{phase.title}</Text>
       </View>
      ))} 
    </View>
  )
}

export default ViewPhases
