import { View, Text } from "react-native"
import React from "react"

type CurrentExerciseProps = {
  exerciseTitle: string
  exerciseDescription?: string
  exerciseNumber: number
  exerciseNumberState: number
}

const CurrentExercise = ({
  exerciseTitle,
  exerciseDescription,
  exerciseNumber,
  exerciseNumberState,
}: CurrentExerciseProps) => {
  return (
    <>
      {exerciseNumber === exerciseNumberState ? (
        <View>
          <Text>{exerciseTitle}</Text>
          <Text>
            {exerciseDescription ? exerciseDescription : "No Description"}
          </Text>
        </View>
      ) : null}
    </>
  )
}

export default CurrentExercise
