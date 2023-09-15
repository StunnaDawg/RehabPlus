import { View, Text, SafeAreaView } from "react-native"
import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ClientScreen,
  DashboardScreen,
  InboxScreen,
  ProtocolScreen,
  CreateNewProtocol,
} from "../screens"
// import Footer from "./Footer"
import { IconButton, Avatar, Button } from "react-native-paper"
import LoginScreen from "../screens/LoginScreen"
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebase"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { signOut } from "firebase/auth"
import { AuthContext } from "../context"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const NavBar = () => {

  const handleSignOut =  () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch(error) {
      alert(error.message)
    }
      
  }

  return (
    <>
      <SafeAreaView className=" flex-row justify-between">
        <Text className="text-xl px-3">Rehab+</Text>
        <View className="flex-row mr-3">
          <Text className="px-3">Hello {FIREBASE_AUTH.currentUser?.email}</Text>
          <Button onPress={handleSignOut} size={25} icon="account" />
        </View>
      </SafeAreaView>
    </>
  )
}

const Footer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Protocol" component={ProtocolScreen} />
      <Tab.Screen name="Client" component={ClientScreen} />
    </Tab.Navigator>
  )
}

const NavBarStack = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  return (

    <Stack.Navigator
      screenOptions={{
        header: () => (isSignedIn ? <NavBar /> : null),
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
          <Stack.Screen name="Protocol" component={ProtocolScreen} />
          <Stack.Screen name="Client" component={ClientScreen} />
        </>
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};


export { NavBarStack, NavBar }
