import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Divider, IconButton, TextInput } from "react-native-paper"
import {} from "react-native-paper"

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
  const [exerciseInput, setExerciseInput] = useState<number>(exerciseSets)

  const addSetHandler = () => {
    setExerciseInput((prevNumber) => prevNumber + 1)
  }

  useEffect(() => {
    console.log(exerciseSets)
  }, [])

  return (
    <>
      {exerciseNumber === exerciseNumberState ? (
        <>
          <View className="flex-row justify-between p-1 items-center">
            <Text className="text-3xl font-bold">{exerciseTitle}</Text>
            <IconButton icon="video" />
          </View>

          <View className="mx-5 mb-4">
            <Text>
              {exerciseDescription ? exerciseDescription : "No Description"}
            </Text>
          </View>

          <View className="border-b">
            <View className=" flex flex-row justify-between">
              <View className="flex flex-col mx-2">
                <Text className="mb-3">Sets</Text>
                {Array?.from({ length: exerciseInput }).map((_item, index) => (
                  <View key={index} className="my-4">
                    <Text className="font-bold text-lg">{`${index + 1}`}</Text>
                  </View>
                ))}
              </View>

              <View className="flex flex-col">
                <Text className="ml-4 mb-2">Reps</Text>
                {Array?.from({ length: exerciseInput }).map((_item, index) => (
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
                {Array?.from({ length: exerciseInput }).map((_item, index) => (
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
            <View>
              <Button onPress={() => addSetHandler()}>Add Set</Button>
            </View>
          </View>
        </>
      ) : null}
    </>
  )
}

export default CurrentExercise
