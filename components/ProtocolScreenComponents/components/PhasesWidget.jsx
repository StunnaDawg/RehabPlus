import { View } from "react-native"
import { Button, Card, Divider, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import { useCurrentPhasesContext } from "../../../context/phasesAddContext"

const PhasesWidget = ({ phaseTitle, phaseId
}) => {
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  return (
    <View>
        <Divider />
        <Text className='text-3xl font-bold'>{phaseTitle ? phaseTitle : 'loading'}</Text>
        <Button onPress={async () => {await setCurrentPhasesData(phaseId)}}>View Protocol</Button>
        <Divider />
    </View>
    // <Card mode="contained" className="w-full max-w-xs p-2.5">
    //      <View className= 'flex-1 flex-row justify-center items-center p-4'>
    //   <Card.Content className="flex-1 flex-row justify-center items-center">
    //     <Text>{phaseTitle ? phaseTitle : 'loading'}</Text>
    //     </Card.Content>
    //     </View>
    //   <Card.Actions className="flex-1 flex-row justify-center items-center">
    //     <Button onPress={async () => {await setCurrentPhasesData(phaseId)}}>View Protocol</Button>
    //   </Card.Actions>
      
    // </Card>
  )
}

export default PhasesWidget
