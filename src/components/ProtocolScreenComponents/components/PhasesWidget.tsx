import { View } from "react-native"
import { Button, Card, Divider, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import { useCurrentPhasesDataContext } from "../../../context/phasesAddContext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

const PhasesWidget = ({ phaseTitle, phaseId }) => {
  const {currentPhasesData, setCurrentPhasesData} = useCurrentPhasesDataContext('')
  const navigation = useNavigation<NavigationType>()
  return (
    <View>
        <Divider />
        <Text className='text-3xl font-bold'>{phaseTitle ? phaseTitle : 'loading'}</Text>
        <Button onPress={async () => {await setCurrentPhasesData(phaseId); navigation.navigate('ViewProtocolPhase') }}>View Protocol</Button>
        <Divider />
    </View>
  )
}

export default PhasesWidget
