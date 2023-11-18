import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useRefreshKeyContext } from "../../../context/refreshKey"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { NavigationType } from "../../../@types/navigation"

type ProtocolPhaseWidgetProps = { 
  phaseTitle?: string
  phaseId: string
}

const PhasesWidget = ({ phaseTitle, phaseId
}: ProtocolPhaseWidgetProps) => {
  const {refreshKey} = useRefreshKeyContext()
  const navigation = useNavigation<NavigationType>()
  const { setCurrentPhasesId } = useCurrentPhasesIdContext()
  useEffect(() => {
    console.log('refresh')
  }, [refreshKey])

  return (
    <Card mode="contained" className="mt-3 mx-14 ">
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleLarge">{phaseTitle}</Text>
      <Card.Actions className="flex-1 flex-row justify-center items-center">
        <Button onPress={() => {setCurrentPhasesId(phaseId); navigation.navigate('AddProtocolWorkoutScreen')}}>Add Workout</Button>
      </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default PhasesWidget
