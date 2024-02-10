import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./src/NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { UserAuthContextProvider } from "./src/context/context"
import { RefreshKeyContextProvider } from "./src/context/refreshKey"
import { EditWorkoutContextProvider } from "./src/context/editWorkoutContext"
import { CompleteWorkoutContextProvider } from "./src/context/completeWorkoutContext"
import { NewWorkoutContextProvider } from "./src/context/addWorkoutProtocol"
import { SingleWorkoutContextProvider } from "./src/context/workoutContext"
import { EditClientContextProvider } from "./src/context/clientContext"
import { SingleEditProtocolContextProvider } from "./src/context/protocolContext"
import { AddClientProtocolContextProvider } from "./src/context/EditProtocolContext"
import { CurrentPhasesDataContextProvider } from "./src/context/phasesAddContext"
import { NewProtocolDataContextProvider } from "./src/context/newProtocolContext"
import { CurrentPhasesIdContextProvider } from "./src/context/phasesIdContext"
import { ExerciseContextProvider } from "./src/context/exerciseContext"
import { DatabaseExercisesContextProvider } from "./src/context/exerciseDataBaseContext"
import { CurrentWorkoutIdContextProvider } from "./src/context/workoutIdContext"
import "react-native-gesture-handler"
import { IsClientTypeContextProvider } from "./src/context/isClient"

export default function App() {
  return (
    <UserAuthContextProvider>
      <IsClientTypeContextProvider>
        <CurrentWorkoutIdContextProvider>
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
        </CurrentWorkoutIdContextProvider>
      </IsClientTypeContextProvider>
    </UserAuthContextProvider>
  )
}
