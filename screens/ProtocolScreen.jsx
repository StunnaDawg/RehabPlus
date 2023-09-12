import { View, Text, ScrollView } from "react-native"
import React from "react"
import ProtocolScreenWidget from "../components/ProtocolScreenComponents/ProtocolScreenWidget"
import ProtocolScreenHeader from "../components/ProtocolScreenComponents/ProtocolScreenHeader"

const ProtocolScreen = () => {
  return (
    <>
      
      <ScrollView>
        <ProtocolScreenHeader />
        <ProtocolScreenWidget />
        <ProtocolScreenWidget />
        <ProtocolScreenWidget />
      </ScrollView>
    </>
  )
}

export default ProtocolScreen
