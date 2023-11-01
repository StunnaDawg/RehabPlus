import { View } from "react-native"
import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"

import GetSingleWorkout from "../../../functions/getSingleWorkout"
import DeleteWorkoutButton from "./DeleteWorkoutButton"
import { useRefreshContext } from "../../../context/refreshKey"
import { useSingleEditWorkoutContext } from "../../../context/editWorkoutContext"
import { useCurrentPhasesContext } from "../../../context/phasesAddContext"

const CompleteWorkoutEditWidget = ({
  id,
  protocolId,
  workoutTitle,
  userId,
}) => {
  const [editWorkoutData, setEditWorkoutData] = useSingleEditWorkoutContext([])
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext('')
  const [refreshKey, setRefreshKey] = useRefreshContext(false)
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const getData = async () => {
    await GetSingleWorkout(id, protocolId,  setEditWorkoutData, currentPhasesData) //setEditWorkoutData
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
      await GetSingleWorkout(id, protocolId, setEditWorkoutData, currentPhasesData)
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
          icon="delete"
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
