import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import GetProtocolWorkouts from '../functions/getProtocolWorkouts'
import { useCurrentPhasesContext } from '../context/phasesAddContext'
import { useSingleProtocolContext } from '../context/protocolContext'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'

const ViewPhaseScreen = () => {
    const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
    const [protocolEditData, setProtocolEditData] = useSingleProtocolContext()
    const [currentPhasesWorkouts, setCurrentPhasesWorkouts] = useState([])
const phasesWorkoutsCollectionRef = collection(db, "protocols", protocolEditData.id, "phases", currentPhasesData, "workouts")

    useEffect(() => {  
        GetProtocolWorkouts(setCurrentPhasesWorkouts, phasesWorkoutsCollectionRef)
    }, [])

    useEffect(() => {console.log('current phase workouts', currentPhasesWorkouts) }, [currentPhasesWorkouts])
  return (
    <View>
      <Text>ViewPhaseScreen</Text>
    </View>
  )
}

export default ViewPhaseScreen