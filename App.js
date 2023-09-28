import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./context"
import { SingleProtocolProvider } from "./protocolContext"

export default function App() {
  return (
    <AuthProvider>
      <SingleProtocolProvider>
        <PaperProvider>
          <NavigationContainer>
            <NavStack />
          </NavigationContainer>
        </PaperProvider>
      </SingleProtocolProvider>
    </AuthProvider>
  )
}
