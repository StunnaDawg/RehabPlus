import { NavigationContainer } from "@react-navigation/native"
import { NavBarStack } from "./components"
import { Provider as PaperProvider } from "react-native-paper"
import { ScrollView } from "react-native"

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <NavBarStack />
      </NavigationContainer>
    </PaperProvider>
  )
}
