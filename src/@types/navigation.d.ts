import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"

export type RootStackParamList = {
  Footer: undefined
  NewProtocol: { protocolId: string | undefined }
  EditProtocol: undefined
  NewClient: undefined
  EditClient: undefined
  ChangeProtocolScreen: undefined
  AddProtocolScreen: undefined
  AddProtocolWorkoutScreen: undefined
  CreateWorkout: undefined
  ExerciseDataBase: undefined
  EditProtocolWorkoutScreen: undefined
  EditWorkoutScreen: undefined
  AddNewWorkoutScreen: undefined
  ViewProtocolScreen: undefined
  ViewPhasesScreen: undefined
  Login: undefined
  SignUp: undefined
  CreateExercise: undefined
  EditExercise: {
    title: string | undefined
    exerciseDescription: string | undefined
    id: string
    categoryId: string
  }
  TestWorkout: {
    protocolId: string
    id?: string
    phaseId: string
  }
  FinishWorkout: undefined
  // Add any other screens here
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  Dashboard: undefined
  Inbox: undefined
  Protocol: undefined
  Client: undefined
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  phaseId?: string
  protocolId?: string
  title?: string
  id?: string
  categoryId?: string
  exerciseDescription?: string
}
