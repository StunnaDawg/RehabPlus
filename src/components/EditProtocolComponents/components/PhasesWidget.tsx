import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import { useNavigation } from "@react-navigation/native"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { NavigationType } from "../../../@types/navigation"

type PhasesWidgetProps = {
  phasesTitle: string
  phaseId: string
}

const PhasesWidget = ({ phasesTitle, phaseId }: PhasesWidgetProps) => {
  const { setCurrentPhasesId } = useCurrentPhasesIdContext()
  const navigation = useNavigation<NavigationType>()

  return (
    <Card mode="contained" className="mt-3 mx-14 ">
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleLarge">{phasesTitle}</Text>
        <Card.Actions className="flex-1 flex-row justify-center items-center">
          <Button
            onPress={() => {
              setCurrentPhasesId(phaseId)
              navigation.navigate("AddProtocolWorkoutScreen")
            }}
          >
            Edit Phase
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default PhasesWidget
