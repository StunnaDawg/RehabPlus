import React, { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ClientScreen,
  DashboardScreen,
  InboxScreen,
  ProtocolScreen,
  CreateNewProtocol,
  LoginScreen,
  SignUpScreen
} from "./screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AuthContext } from "./context"
import { NavBar } from "./components"
import CreateNewClient from "./screens/CreateNewClient"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
  
  const NavStack = () => {
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
            <Stack.Screen name='NewProtocol' component={CreateNewProtocol} />
            <Stack.Screen name='NewClient' component={CreateNewClient} />
          </>
        ) : (
            <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpScreen}
          />
          </>
        )}
      </Stack.Navigator>
    );
  };

  export {NavStack}