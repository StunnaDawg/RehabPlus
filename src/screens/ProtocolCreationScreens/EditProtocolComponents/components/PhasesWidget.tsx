import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import { useNavigation } from "@react-navigation/native"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { NavigationType } from "../../../../@types/navigation"
import { View } from "react-native"

type PhasesWidgetProps = {
  phasesTitle: string
  phaseId: string
}

const PhasesWidget = ({ phasesTitle, phaseId }: PhasesWidgetProps) => {
  const { setCurrentPhasesId } = useCurrentPhasesIdContext()
  const navigation = useNavigation<NavigationType>()

  return (
    <View className="flex flex-row justify-center mt-3 mx-14 bg-slate-300 border rounded ">
      <View className="flex flex-col items-center">
        <Text className="text-xl">{phasesTitle}</Text>

        <Button
          textColor="black"
          onPress={() => {
            setCurrentPhasesId(phaseId)
            navigation.navigate("AddProtocolWorkoutScreen")
          }}
        >
          Edit Phase
        </Button>
      </View>
    </View>
  )
}

export default PhasesWidget
