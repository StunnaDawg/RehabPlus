import { ScrollView, View } from "react-native"
import React from "react"
import AddWorkout from "./WorkoutCreationScreens/AddWorkout"

const AddProtocolWorkout = () => {
  return (
    <ScrollView className="bg-slate-500">
      <AddWorkout />
    </ScrollView>
  )
}

export default AddProtocolWorkout
