import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { UserAuthContextProvider } from "./context/context"
import { RefreshKeyContextProvider } from "./context/refreshKey"
import { EditWorkoutContextProvider } from "./context/editWorkoutContext"
import { CompleteWorkoutContextProvider } from "./context/completeWorkoutContext"
import { WorkoutContextProvider } from "./context/addWorkoutProtocol"
import { SingleWorkoutContextProvider } from "./context/workoutContext"
import { EditClientContextProvider } from "./context/clientContext"
import { SingleEditProtocolContextProvider } from "./context/protocolContext"
import { AddProtocolProvider } from "./context/AddProtocolContext"
import { AddClientProtocolContextProvider } from "./context/EditProtocolContext"
import { CurrentPhasesDataContextProvider } from "./context/phasesAddContext"
import { NewProtocolDataContextProvider  } from "./context/newProtocolContext"

export default function App() {
  return (
    <UserAuthContextProvider>
      <NewProtocolDataContextProvider>
        <RefreshKeyContextProvider>
          <CurrentPhasesDataContextProvider >
            <EditWorkoutContextProvider>
              <CompleteWorkoutContextProvider>
                <WorkoutContextProvider>
                  <SingleWorkoutContextProvider>
                    <EditClientContextProvider>
                      <SingleEditProtocolContextProvider>
                        <AddProtocolProvider>
                          <AddClientProtocolContextProvider >
                            <NavigationContainer>
                              <PaperProvider>
                                <NavStack />
                              </PaperProvider>
                            </NavigationContainer>
                          </AddClientProtocolContextProvider >
                        </AddProtocolProvider>
                      </SingleEditProtocolContextProvider>
                    </EditClientContextProvider>
                  </SingleWorkoutContextProvider>
                </WorkoutContextProvider>
              </CompleteWorkoutContextProvider>
            </EditWorkoutContextProvider>
          </CurrentPhasesDataContextProvider >
        </RefreshKeyContextProvider>
      </NewProtocolDataContextProvider>
    </UserAuthContextProvider>
  )
}
