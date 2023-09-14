import { View, Text, SafeAreaView } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ClientScreen,
  DashboardScreen,
  InboxScreen,
  ProtocolScreen,
  CreateNewProtocol
} from "../screens"
import Footer from "./Footer"
import { IconButton, Avatar } from 'react-native-paper'

const Stack = createNativeStackNavigator()

const NavBar = () => {
  const navigation = useNavigation()

  return (
    <>
      <SafeAreaView className=" flex-row justify-between">
        <Text className="text-xl px-3">Rehab+</Text>
        <View className="flex-row mr-3">
        <Text className="px-3">
          Hello, User
        </Text>
        <Avatar.Icon size={25} icon='account'/>
        </View>
      </SafeAreaView>
    </>
  )
}

const NavBarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <NavBar />,
      }}
    >
      <Stack.Screen name="Footer" component={Footer} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Clients" component={ClientScreen} />
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Protocol" component={ProtocolScreen} />
      <Stack.Screen name="NewProtocol" component={CreateNewProtocol} />
    </Stack.Navigator>
  )
}

export { NavBarStack, NavBar }
