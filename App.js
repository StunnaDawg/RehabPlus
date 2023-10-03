import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./context"
import { SingleProtocolProvider } from "./protocolContext"
import { SingleClientProvider } from "./clientContext"
import { EditProtocolProvider } from "./components/EditClientComponents/functions/EditProtocolContext"

export default function App() {
  return (
    <AuthProvider>
      <SingleClientProvider>
        <SingleProtocolProvider>
          <EditProtocolProvider>
            <PaperProvider>
              <NavigationContainer>
                <NavStack />
              </NavigationContainer>
            </PaperProvider>
          </EditProtocolProvider>
        </SingleProtocolProvider>
      </SingleClientProvider>
    </AuthProvider>
  )
}
