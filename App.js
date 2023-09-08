import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/DashboardScreen';
import NavBar from './components/NavBar';
import ProtocolScreen from './screens/ProtocolScreen';
import ClientScreen from './screens/ClientScreen';
import InboxScreen from './screens/InboxScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name='Dashboard' component={DashboardScreen}/>
      <Stack.Screen name='Inbox' component={InboxScreen}/>
      <Stack.Screen name='Protocol' component={ProtocolScreen}/>
      <Stack.Screen name='Client' component={ClientScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
