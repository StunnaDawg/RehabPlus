import { View } from "react-native"
import { Button, Card, Text } from "react-native-paper"
// import ExerciseImage from "../../../assets/physcial-medicine.jpg"
import React, { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useRefreshContext } from "../../../context/refreshKey"

const PhasesWidget = ({ phasesTitle, phaseId
}) => {
  const [refreshKey, setRefreshKey] = useRefreshContext(false)
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  useEffect(() => {
    console.log('refresh')
  }, [refreshKey])

  return (
    <Card mode="contained" className="mt-3 mx-14 ">
      <Card.Content className="flex-1 flex-row justify-center items-center">
        <Text variant="titleLarge">{phasesTitle}</Text>
      <Card.Actions className="flex-1 flex-row justify-center items-center">
        <Button onPress={() => navigation.navigate('EditProtocolWorkoutScreen', { phaseId: phaseId })}>Edit Phase</Button>
      </Card.Actions>
      </Card.Content>
    </Card>
  )
}

export default PhasesWidget
