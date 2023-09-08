import { StatusBar } from "expo-status-bar"
import React from "react"
import { Text, View, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Footer, NavBar, NavBarStack } from "./components"
import {
  ClientScreen,
  DashboardScreen,
  InboxScreen,
  ProtocolScreen,
} from "./screens"
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <NavBarStack />
    </NavigationContainer>
  )
}
