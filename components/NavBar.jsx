import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientScreen, DashboardScreen, InboxScreen, ProtocolScreen } from '../screens';
import Footer from './Footer';
const Stack = createNativeStackNavigator();


const NavBar = () => {
    const navigation = useNavigation()

  return (
    <>
    <SafeAreaView >
      <Text className="bg-gray-500">Rehab+</Text>
    </SafeAreaView>
    </>
  )
}

const NavBarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <NavBar />,
      }}>
        <Stack.Screen name="Footer" component={Footer}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="Inbox" component={InboxScreen}/>
        <Stack.Screen name="Protocol" component={ProtocolScreen}/>
        <Stack.Screen name="Clients" component={ClientScreen}/>
    </Stack.Navigator>
  )
}

export {NavBarStack, NavBar}