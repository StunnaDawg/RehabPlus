import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import GetSingleWorkout from "../../../functions/getSingleWorkout"
import DeleteWorkoutButton from "./DeleteWorkoutButton"
import { useRefreshKeyContext } from "../../../context/refreshKey"
import { useEditWorkoutContext } from "../../../context/editWorkoutContext"
import { useCurrentPhasesIdContext } from "../../../context/phasesIdContext"
import { NavigationType } from "../../../@types/navigation"

type CompleteWorkoutEditWidgetProps = { 
  id: string
  protocolId: string
  workoutTitle?: string
  userId: string
}

const CompleteWorkoutEditWidget = ({
  id,
  protocolId,
  workoutTitle,
  userId,
}: CompleteWorkoutEditWidgetProps) => {
  const {editWorkoutData, setEditWorkoutData} = useEditWorkoutContext()
  const {currentPhasesId} = useCurrentPhasesIdContext()
  const {refreshKey} = useRefreshKeyContext()
  const navigation = useNavigation<NavigationType>()

  const getData = async () => {
    await GetSingleWorkout(id, protocolId,  setEditWorkoutData, currentPhasesId) //setEditWorkoutData
  }

  useEffect(() => {
    console.log(
      id,
      protocolId,
      workoutTitle,
      userId,)
  }, [])

  useEffect(() => {
    console.log('refresh')
    const getRefreshData = async () => {
      await GetSingleWorkout(id, protocolId, setEditWorkoutData, currentPhasesId)
    }
    getRefreshData()
  }, [refreshKey])

  useEffect(() => {
    console.log("workout to be edited", editWorkoutData)
  }, [editWorkoutData])
  return (
    <Card mode="contained" className="mt-3 mx-14 ">
      <Card.Actions>
        <DeleteWorkoutButton
          id={id}
          protocolId={protocolId}
          userId={userId}
          phaseId={currentPhasesId}
        />
      </Card.Actions>
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleLarge">{workoutTitle}</Text>
      </Card.Content>
      <Card.Content className="flex-1 flex-row">
        {/* <Card.Cover className="w-20 h-20" source={ExerciseImage} /> */}
        <Card.Actions className="flex-1 flex-col">
          <Button
            className="my-1"
            onPress={async () => {
              await getData()
              navigation.navigate("EditWorkoutScreen")
            }}
          >
            Edit
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default CompleteWorkoutEditWidget
