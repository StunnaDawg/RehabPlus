import { ScrollView } from "react-native"
import React from "react"
import ClientTable from "./components/ClientTable"
import ClientHeader from "./components/ClientHeader"

const ClientScreen = () => {
  return (
    <ScrollView>
      <ClientHeader />
      <ClientTable />
    </ScrollView>
  )
}

export default ClientScreen
