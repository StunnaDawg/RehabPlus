import { NavigationContainer } from "@react-navigation/native"
import { NavBarStack } from "./components"
import { Provider as PaperProvider } from "react-native-paper"
import { ScrollView } from "react-native"
import LoginScreen from "./screens/LoginScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthProvider } from "./context"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
    <PaperProvider>
      <NavigationContainer>
        <NavBarStack />
      </NavigationContainer>
    </PaperProvider>
    </AuthProvider>
  )
}
