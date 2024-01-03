import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { IconButton, TextInput } from "react-native-paper"

type CurrentExerciseProps = {
  exerciseTitle: string
  exerciseDescription?: string
  exerciseNumber: number
  exerciseNumberState: number
  exerciseSets: number
}

type SetCount = {
  count: number
}

const CurrentExercise = ({
  exerciseTitle,
  exerciseDescription,
  exerciseNumber,
  exerciseNumberState,
  exerciseSets,
}: CurrentExerciseProps) => {
  useEffect(() => {
    console.log(exerciseSets)
  }, [])
  return (
    <>
      {exerciseNumber === exerciseNumberState ? (
        <>
          <View className="flex-row justify-between p-5 items-center">
            <Text className="text-3xl font-bold">{exerciseTitle}</Text>
            <IconButton icon="video" />
          </View>

          <View className="border-b">
            <View className="mx-5">
              <Text>
                {exerciseDescription ? exerciseDescription : "No Description"}
              </Text>
            </View>

            <View className=" flex flex-row justify-between">
              <View className="flex flex-col mx-2">
                <Text className="mb-2">Sets</Text>
                {Array?.from({ length: exerciseSets }).map((_item, index) => (
                  <View key={index} className="my-4">
                    <Text className="font-bold text-lg">{`${index}`}</Text>
                  </View>
                ))}
              </View>

              <View className="flex flex-col">
                <Text className="ml-4 mb-2">Reps</Text>
                {Array?.from({ length: exerciseSets }).map((_item, index) => (
                  <View key={index} className="flex-col">
                    <TextInput
                      mode="outlined"
                      placeholder="Reps"
                      className="ml-4 mb-2"
                    />
                  </View>
                ))}
              </View>

              <View className="flex flex-col ml-5">
                <Text className="mb-2">Weight</Text>
                {Array?.from({ length: exerciseSets }).map((_item, index) => (
                  <View key={index} className="">
                    <TextInput
                      mode="outlined"
                      className="mr-16 w-48 mb-2"
                      placeholder="Weight"
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      ) : null}
    </>
  )
}

export default CurrentExercise
