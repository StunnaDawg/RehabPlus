import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./context/context"
import { RefreshContextProvider } from "./context/refreshKey"
import { EditWorkoutContextProvider } from "./context/editWorkoutContext"
import { CompleteWorkoutContextProvider } from "./context/completeWorkoutContext"
import { WorkoutContextProvider } from "./context/addWorkoutProtocol"
import { ExerciseContextProvider } from "./context/workoutContext"
import { SingleClientProvider } from "./context/clientContext"
import { SingleProtocolProvider } from "./context/protocolContext"
import { AddProtocolProvider } from "./context/AddProtocolContext"
import { EditProtocolProvider } from "./context/EditProtocolContext"


export default function App() {
  return (
    <AuthProvider>
      <RefreshContextProvider>
        <EditWorkoutContextProvider>
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
        </EditWorkoutContextProvider>
      </RefreshContextProvider>
    </AuthProvider>
  )
}
