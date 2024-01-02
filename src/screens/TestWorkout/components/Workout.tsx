import { View, Text } from "react-native"
import React from "react"
import { IconButton } from "react-native-paper"

type CurrentExerciseProps = {
  exerciseTitle: string
  exerciseDescription?: string
  exerciseNumber: number
  exerciseNumberState: number
  exerciseSets?: number | string
}

const CurrentExercise = ({
  exerciseTitle,
  exerciseDescription,
  exerciseNumber,
  exerciseNumberState,
  exerciseSets,
}: CurrentExerciseProps) => {
  return (
    <>
      {exerciseNumber === exerciseNumberState ? (
        <View>
          <View className="flex flex-row justify-between p-5 items-center">
            <Text className="text-3xl font-bold">{exerciseTitle}</Text>
            <IconButton icon="video" />
          </View>

          <View className="border-b">
            <View className="mx-2 my-10">
              <Text>
                {exerciseDescription ? exerciseDescription : "No Description"}
              </Text>
            </View>
          </View>

          <View></View>
        </View>
      ) : null}
    </>
  )
}

export default CurrentExercise
