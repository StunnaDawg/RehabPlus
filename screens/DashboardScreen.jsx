import { View } from "react-native"
import React from "react"
import InboxWidget from "../components/InboxWidget"
import ClientWidget from "../components/ClientWidget"
import ProtocolWidget from "../components/ProtocolWidget"

const DashboardScreen = () => {

  return (
    <>
      <View className="flex-1">
        <InboxWidget />
        <ProtocolWidget />
        <ClientWidget />
      </View>
    </>
  )
}

export default DashboardScreen
