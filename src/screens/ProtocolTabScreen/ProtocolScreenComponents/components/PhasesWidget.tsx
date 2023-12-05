import { View } from "react-native"
import { Button, Card, Divider, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React from "react"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../../../../@types/navigation"
import { ProtocolPhase } from "../../../../@types/firestore"

const PhasesWidget = ({ title: phaseTitle, id: phaseId }: ProtocolPhase) => {
  const { setCurrentPhasesId } = useCurrentPhasesIdContext()
  const navigation = useNavigation<TabNavigationType>()
  return (
    <View>
      <Divider />
      <Text className="text-3xl font-bold">
        {phaseTitle ? phaseTitle : "loading"}
      </Text>
      <Button
        onPress={() => {
          setCurrentPhasesId(phaseId)
          navigation.navigate("ViewProtocolPhase")
        }}
      >
        View Protocol
      </Button>
      <Divider />
    </View>
  )
}

export default PhasesWidget
