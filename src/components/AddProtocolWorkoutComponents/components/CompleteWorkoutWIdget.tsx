import { useNavigation } from "@react-navigation/native"
import { Button, Card, Text } from "react-native-paper"
import { NavigationType } from "../../../@types/navigation"
import { useCurrentWorkoutIdContext } from "../../../context/workoutIdContext"
import { useEffect } from "react"
import { useEditWorkoutContext } from "../../../context/editWorkoutContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import GetSingleWorkout from "../../../functions/getSingleWorkout"

type CompleteWorkoutWidgetProps = {
  workoutTitle?: string
  workoutId?: string
}

const CompleteWorkoutWidget = ({
  workoutTitle,
  workoutId,
}: CompleteWorkoutWidgetProps) => {
  const { currentPhasesId } = useCurrentPhasesIdContext()
  const { newProtocolData } = useNewProtocolDataContext()
  const { setEditWorkoutData } = useEditWorkoutContext()
  const navigation = useNavigation<NavigationType>()
  const protocolId = newProtocolData.id

  useEffect(() => {
    console.log(workoutTitle, workoutId)
  }, [])

  const setId = async () => {
    console.log("pressed")
    if (workoutId != undefined) {
      try {
        GetSingleWorkout(
          workoutId,
          protocolId,
          setEditWorkoutData,
          currentPhasesId
        )
        navigation.navigate("EditProtocolWorkoutScreen")
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Card mode="contained" className="mt-3 mx-8 ">
      <Card.Content className="flex-1 flex-row justify-center">
        <Text variant="titleLarge">{workoutTitle}</Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        {/* <Card.Cover className="w-20 h-20" source={ExerciseImage} /> */}
        <Card.Actions className="flex-1 flex-col">
          <Button
            className="my-1"
            onPress={() => {
              setId()
            }}
          >
            View
          </Button>
          <Button className="my-1">Delete</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default CompleteWorkoutWidget
