import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../functions/getProtocolWorkouts"
import { useCurrentPhasesDataContext } from "../context/phasesAddContext"
import { useSingleEditProtocolContext} from "../context/protocolContext"
import { collection } from "firebase/firestore"
import { db } from "../firebase"
import { Button, IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

const ViewProtocolScreen = () => {
  const [phasesData, setPhasesData] = useState([])
  const {protocolEditData, setProtocolEditData} = useSingleEditProtocolContext()
  const [currentPhasesWorkouts, setCurrentPhasesWorkouts] = useState([])
  const navigation = useNavigation()

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
              Weeks: {protocolEditData?.weeks}
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
        <View className='mb-1 mx-6'>
          <Button onPress={(() => navigation.navigate('ViewPhasesScreen'))} mode="contained" className='p-1'>
            <Text className='text-lg' >View Protocol</Text></Button>
          </View>
          <View className='mb-1 mx-10'>
          <Button mode="outlined" className='p-1'>
            <Text className='text-lg'>Assign Protocol</Text>
            </Button>
          </View>
      </View>
    </>
  )
}

export default ViewProtocolScreen
