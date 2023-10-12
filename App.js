import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./context"
import { SingleProtocolProvider } from "./protocolContext"
import { SingleClientProvider } from "./clientContext"
import { EditProtocolProvider } from "./components/EditClientComponents/functions/EditProtocolContext"
import { AddProtocolProvider } from "./components/CreateClientComponents/functions/AddProtocolContext"
import { ExerciseContextProvider } from "./workoutContext"
import { WorkoutContextProvider } from "./addWorkoutProtocol"
import { CompleteWorkoutContextProvider } from "./completeWorkoutContext"

export default function App() {
  return (
    <AuthProvider>
      <CompleteWorkoutContextProvider>
      <WorkoutContextProvider>
      <ExerciseContextProvider>
        <SingleClientProvider>
          <SingleProtocolProvider>
            <AddProtocolProvider>
              <EditProtocolProvider>
                <PaperProvider>
                  <NavigationContainer>
                    <NavStack />
                  </NavigationContainer>
                </PaperProvider>
              </EditProtocolProvider>
            </AddProtocolProvider>
          </SingleProtocolProvider>
        </SingleClientProvider>
      </ExerciseContextProvider>
      </WorkoutContextProvider>
      </CompleteWorkoutContextProvider>
    </AuthProvider>
  )
}
