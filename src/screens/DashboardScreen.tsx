import { ScrollView, View } from "react-native"
import React from "react"
import InboxWidget from "../components/InboxWidget"
import ClientWidget from "../components/ClientScreenComponents/ClientWidget"
import ProtocolWidget from "../components/ProtocolScreenComponents/ProtocolWidget"

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
