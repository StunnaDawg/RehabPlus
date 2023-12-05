import { ScrollView } from "react-native"
import React from "react"
import InboxWidget from "./components/InboxWidget"
import ClientWidget from "./components/ClientWidget"
import ProtocolWidget from "./components/ProtocolWidget"

const DashboardScreen = () => {
  return (
    <>
      <ScrollView className="flex-1">
        <ProtocolWidget />
        <ClientWidget />
        <InboxWidget />
      </ScrollView>
    </>
  )
}

export default DashboardScreen
