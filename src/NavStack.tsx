import React, { useContext, useEffect, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ClientScreen,
  DashboardScreen,
  InboxScreen,
  ProtocolScreen,
  CreateNewProtocol,
  LoginScreen,
  SignUpScreen,
} from "./screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useUserAuth } from "./context/context"
import NavBar from "./components"
import CreateNewClient from "./screens/ClientCreationScreens/NewClientScreen/CreateNewClient"
import EditProtocol from "./screens/ProtocolCreationScreens/EditProtocolComponents/EditProtocol"
import EditClientScreen from "./screens/ClientCreationScreens/EditClientComponents/EditClientScreen"
import ChangeClientProtocolScreen from "./screens/ClientCreationScreens/EditClientComponents/ChangeProtocol"
import AddClientProtocolScreen from "./screens/ClientCreationScreens/NewClientScreen/AddProtocolScreen"
import AddProtocolWorkout from "./screens/ProtocolCreationScreens/WorkoutCreationScreens/AddWorkout"
import CreateWorkout from "./screens/ProtocolCreationScreens/WorkoutCreationScreens/CreateWorkout"
import ExerciseDataBase from "./screens/ExerciseDatabase/ExerciseDataBase"
import ViewProtocolScreen from "./screens/ViewProtocolScreen/ViewProtocolScreen"
import ViewPhases from "./screens/ViewProtocolScreen/ViewPhases"
import { RootStackParamList, TabParamList } from "./@types/navigation"
import EditCreatedWorkout from "./screens/ProtocolCreationScreens/WorkoutCreationScreens/EditMadeWorkout"
import CreateExercise from "./screens/ExerciseDatabase/CreateExerciseScreen/CreateExercise"
import EditExercise from "./screens/ExerciseDatabase/EditExerciseScreen/EditExercise"
import TestWorkout from "./screens/TestWorkout/TestWorkout"
import FinishWorkout from "./screens/TestWorkout/FinishWorkout"
import ClientDashboard from "./clientScreens/Dashboard/ClientDashboard"
import { FIREBASE_AUTH, db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

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
  const { isSignedIn } = useUserAuth()
  // const { isClient } = useIsClient()
  const [isClient, setIsClient] = useState<boolean>()

  useEffect(() => {
    const id = FIREBASE_AUTH.currentUser?.uid
    if (id) {
      const clientRef = doc(db, "clients", id)
      const getFunction = async () => {
        const docSnap = await getDoc(clientRef)
        if (docSnap.exists()) {
          setIsClient(true)
        } else {
          setIsClient(false)
        }
      }
      getFunction()
    }
  }, [])

  useEffect(() => {
    const id = FIREBASE_AUTH.currentUser?.uid
    if (id) {
      const clientRef = doc(db, "clients", id)
      const getFunction = async () => {
        const docSnap = await getDoc(clientRef)
        if (docSnap.exists()) {
          setIsClient(true)
        } else {
          setIsClient(false)
        }
      }
      getFunction()
    }
  }, [isSignedIn])

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (isSignedIn ? <NavBar /> : null),
      }}
    >
      {isSignedIn ? (
        !isClient ? (
          <>
            <Stack.Screen name="Footer" component={Footer} />
            <Stack.Screen name="NewProtocol" component={CreateNewProtocol} />
            <Stack.Screen name="EditProtocol" component={EditProtocol} />
            <Stack.Screen name="NewClient" component={CreateNewClient} />
            <Stack.Screen name="EditClient" component={EditClientScreen} />
            <Stack.Screen
              name="ChangeProtocolScreen"
              component={ChangeClientProtocolScreen}
            />
            <Stack.Screen
              name="AddProtocolScreen"
              component={AddClientProtocolScreen}
            />
            <Stack.Screen
              name="AddProtocolWorkoutScreen"
              component={AddProtocolWorkout}
            />
            <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
            <Stack.Screen
              name="ExerciseDataBase"
              component={ExerciseDataBase}
            />
            <Stack.Screen
              name="EditProtocolWorkoutScreen"
              component={EditCreatedWorkout}
            />
            <Stack.Screen
              name="ViewProtocolScreen"
              component={ViewProtocolScreen}
            />
            <Stack.Screen name="ViewPhasesScreen" component={ViewPhases} />
            <Stack.Screen name="CreateExercise" component={CreateExercise} />
            <Stack.Screen name="EditExercise" component={EditExercise} />
            <Stack.Screen name="TestWorkout" component={TestWorkout} />
            <Stack.Screen name="FinishWorkout" component={FinishWorkout} />
          </>
        ) : (
          <Stack.Screen name="ClientDashboard" component={ClientDashboard} />
        )
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
  )
}

export { NavStack }
