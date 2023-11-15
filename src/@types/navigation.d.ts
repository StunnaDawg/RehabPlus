import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Footer: undefined;
    NewProtocol: undefined;
    EditProtocol: undefined;
    NewClient: undefined;
    EditClient: undefined;
    ChangeProtocolScreen: undefined;
    AddProtocolScreen: undefined;
    AddProtocolWorkoutScreen: undefined;
    CreateWorkout: undefined;
    ExerciseDataBase: undefined;
    EditProtocolWorkoutScreen: undefined;
    EditWorkoutScreen: undefined;
    AddNewWorkoutScreen: undefined;
    ViewProtocolScreen: undefined;
    ViewPhasesScreen: undefined;
    Login: undefined;
    SignUp: undefined;
    // Add any other screens here
  };
  
  export type NavigationType = NativeStackNavigationProp<RootStackParamList>;


  export type TabParamList = {
    Dashboard: undefined;
    Inbox: undefined;
    Protocol: undefined;
    Client: undefined;
  };