import { ScrollView } from "react-native"
import React from "react"
import NewClient from "./NewClient"

const CreateNewClient = () => {
  return (
    <ScrollView className="bg-slate-500">
      <NewClient />
    </ScrollView>
  )
}

export default CreateNewClient
