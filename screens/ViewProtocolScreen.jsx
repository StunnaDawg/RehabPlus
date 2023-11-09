import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../functions/getProtocolWorkouts"
import { useCurrentPhasesContext } from "../context/phasesAddContext"
import { useSingleProtocolContext } from "../context/protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../firebase"
import { Button, Card, IconButton } from "react-native-paper"

const ViewProtocolScreen = () => {
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext("")
  const [phasesData, setPhasesData] = useState([])
  const [protocolEditData, setProtocolEditData] = useSingleProtocolContext()
  const [currentPhasesWorkouts, setCurrentPhasesWorkouts] = useState([])
  // const phasesWorkoutsCollectionRef = collection(db, "protocols", protocolEditData.id, "phases", currentPhasesData, "workouts")

  // useEffect(() => {
  //   const setPhases = async () => {
  //     await GetProtocolWorkouts(setPhasesData, phasesCollectionRef)
  //   }
  //   setPhases()
  //   console.log("phases data", phasesData)r
  // }, [])

  // useEffect(() => {
  //     GetProtocolWorkouts(setCurrentPhasesWorkouts, phasesWorkoutsCollectionRef)
  // }, [])

  useEffect(() => {
    console.log("viewing protocol", protocolEditData)
  }, [currentPhasesWorkouts])
  return (
    <>
      <ScrollView>
        <View className="mb-20">
          <View className="flex flex-row justify-center">
            <IconButton icon="image-plus" size={100} />
          </View>
        </View>
        <View className="mb-8">
          <View className="mx-2 mb-5">
            <Text className="text-4xl font-bold">{protocolEditData.title}</Text>
          </View>
          <View className="flex flex-row justify-start">
            <Text className="font-semibold mx-4">Phases:</Text>
            <Text className="font-semibold">
              Weeks: {protocolEditData.weeks}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <View className="mx-2">
            <Text className="text-2xl font-semibold">Protocol overview:</Text>
            <Text>{protocolEditData.description}</Text>
          </View>
        </View>

        <View className="mx-2">
          <Text className="text-2xl font-semibold">About the Creator:</Text>
          <Text>blah blah creator is a blah blah at blah blah</Text>
        </View>
      </ScrollView>

      <View className='flex flex-1'>
        <View className='mb-2 mx-6'>
          <Button mode="contained" className='p-1'>
            <Text className='text-lg'>View Protocol</Text></Button>
          </View>
          <View className='mx-10'>
          <Button mode="outlined" className='p-1'>
            <Text className='text-lg'>Start Protocol</Text>
            </Button>
          </View>
      </View>
    </>
    //   {currentPhasesWorkouts.map((workout) => {
    //     console.log('workout', workout.workout.title)
    //     return (
    //         <View key={workout.id}>
    //         <Card mode="contained" className="mt-3 mx-14 ">
    //         <Card.Content className='flex flex-col items-center'>
    //           <Text className='text-4xl'>{workout.workout.title}</Text>
    //           <Button onPress={() => {}}>View</Button>
    //         </Card.Content>
    //       </Card>
    //       </View>
    //   )
    // })}
  )
}

export default ViewProtocolScreen
