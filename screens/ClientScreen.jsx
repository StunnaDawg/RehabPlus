import { View, Text, ScrollView } from "react-native"
import React from "react"
import ClientTable from "../components/ClientScreenComponents/ClientTable"
import ClientHeader from "../components/ClientScreenComponents/ClientHeader"

const ClientScreen = () => {
  return (
    <ScrollView>
      <ClientHeader />
      <ClientTable />
    </ScrollView>
  )
}

export default ClientScreen
