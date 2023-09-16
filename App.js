import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./context"

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <NavStack />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  )
}
