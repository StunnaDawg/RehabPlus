import { Button, Card, Icon, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useRefreshKeyContext } from "../../../../context/refreshKey"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { NavigationType } from "../../../../@types/navigation"
import { View } from "react-native"

type ProtocolPhaseWidgetProps = {
  phaseTitle?: string
  phaseId: string
}

const PhasesWidget = ({ phaseTitle, phaseId }: ProtocolPhaseWidgetProps) => {
  const { refreshKey } = useRefreshKeyContext()
  const navigation = useNavigation<NavigationType>()
  const { setCurrentPhasesId } = useCurrentPhasesIdContext()
  useEffect(() => {
    console.log("refresh")
  }, [refreshKey])

  return (
    <View className="flex flex-row justify-center mt-3 mx-14 bg-slate-300 border rounded ">
      <View className="flex flex-col items-center">
        <Text variant="titleLarge">Phase: {phaseTitle}</Text>
        <Button
          onPress={() => {
            setCurrentPhasesId(phaseId)
            navigation.navigate("AddProtocolWorkoutScreen")
          }}
          icon="plus"
          textColor="black"
        >
          Add Workout
        </Button>
      </View>
    </View>
  )
}

export default PhasesWidget
