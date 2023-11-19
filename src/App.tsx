import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { UserAuthContextProvider } from "./context/context"
import { RefreshKeyContextProvider } from "./context/refreshKey"
import { EditWorkoutContextProvider } from "./context/editWorkoutContext"
import { CompleteWorkoutContextProvider } from "./context/completeWorkoutContext"
import { NewWorkoutContextProvider } from "./context/addWorkoutProtocol"
import { SingleWorkoutContextProvider } from "./context/workoutContext"
import { EditClientContextProvider } from "./context/clientContext"
import { SingleEditProtocolContextProvider } from "./context/protocolContext"
import { AddClientProtocolContextProvider } from "./context/EditProtocolContext"
import { CurrentPhasesDataContextProvider } from "./context/phasesAddContext"
import { NewProtocolDataContextProvider } from "./context/newProtocolContext"
import { CurrentPhasesIdContextProvider } from "./context/phasesIdContext"
import { ExerciseContextProvider } from "./context/exerciseContext"
import { DatabaseExercisesContextProvider } from "./context/exerciseDataBaseContext"
import "react-native-gesture-handler"

export default function App() {
  return (
    <UserAuthContextProvider>
      <DatabaseExercisesContextProvider>
      <ExerciseContextProvider>
      <CurrentPhasesIdContextProvider>
        <NewProtocolDataContextProvider>
          <RefreshKeyContextProvider>
            <CurrentPhasesDataContextProvider>
              <EditWorkoutContextProvider>
                <CompleteWorkoutContextProvider>
                  <NewWorkoutContextProvider>
                    <SingleWorkoutContextProvider>
                      <EditClientContextProvider>
                        <SingleEditProtocolContextProvider>
                          <AddClientProtocolContextProvider>
                            <NavigationContainer>
                              <PaperProvider>
                                <NavStack />
                              </PaperProvider>
                            </NavigationContainer>
                          </AddClientProtocolContextProvider>
                        </SingleEditProtocolContextProvider>
                      </EditClientContextProvider>
                    </SingleWorkoutContextProvider>
                  </NewWorkoutContextProvider>
                </CompleteWorkoutContextProvider>
              </EditWorkoutContextProvider>
            </CurrentPhasesDataContextProvider>
          </RefreshKeyContextProvider>
        </NewProtocolDataContextProvider>
      </CurrentPhasesIdContextProvider>
      </ExerciseContextProvider>
      </DatabaseExercisesContextProvider>
    </UserAuthContextProvider>
  )
}