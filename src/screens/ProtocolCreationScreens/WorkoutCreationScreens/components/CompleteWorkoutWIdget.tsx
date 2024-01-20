import { useNavigation } from "@react-navigation/native"
import { Button, Card, Text } from "react-native-paper"
import { NavigationType } from "../../../../@types/navigation"
import { useCurrentWorkoutIdContext } from "../../../../context/workoutIdContext"
import { useEffect } from "react"
import { useEditWorkoutContext } from "../../../../context/editWorkoutContext"
import { useCurrentPhasesIdContext } from "../../../../context/phasesIdContext"
import { useNewProtocolDataContext } from "../../../../context/newProtocolContext"
import GetSingleWorkout from "../../../../functions/getSingleWorkout"
import { View } from "react-native"

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
  const { currentWorkoutId, setCurrentWorkoutId } = useCurrentWorkoutIdContext()
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
        setCurrentWorkoutId(workoutId)
        console.log("gotWorkout for", workoutId)
        navigation.navigate("EditProtocolWorkoutScreen")
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    console.log("current workoutId on press", currentWorkoutId)
  }, [currentWorkoutId])

  return (
    <View className="flex flex-row justify-center mt-3 mx-8 bg-slate-300 border rounded">
      <View className="flex flex-col items-center">
        <Text className="text-2xl font-bold">{workoutTitle}</Text>
        <Button
          textColor="black"
          className="my-1"
          onPress={async () => {
            await setId()
            navigation.navigate("EditProtocolWorkoutScreen")
          }}
        >
          View
        </Button>
        <Button textColor="black" className="my-1">
          Delete
        </Button>
      </View>
    </View>
  )
}

export default CompleteWorkoutWidget
