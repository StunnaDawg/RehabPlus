import { useNavigation } from "@react-navigation/native"
import { Button, Card, Text } from "react-native-paper"
import { NavigationType } from "../../../@types/navigation"
import { useCurrentWorkoutIdContext } from "../../../context/workoutIdContext"
import { useEffect } from "react"

type CompleteWorkoutWidgetProps = {
  workoutTitle?: string
  workoutId?: string
}

const CompleteWorkoutWidget = ({
  workoutTitle,
  workoutId,
}: CompleteWorkoutWidgetProps) => {
  const { setCurrentWorkoutId } = useCurrentWorkoutIdContext()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    console.log(workoutTitle, workoutId)
  }, [])

  const setId = async () => {
    console.log("pressed")
    if (workoutId != undefined) {
      try {
        console.log("we made it")
        setCurrentWorkoutId(workoutId)
        console.log(workoutId)
        navigation.navigate("CreateWorkout")
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
