import { View, Text, SafeAreaView } from "react-native"
import { Button } from "react-native-paper"
import { FIREBASE_AUTH } from "../firebase"

import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../@types/navigation"
const NavBar = () => {
  const navigation = useNavigation<TabNavigationType>()
  const handleSignOut = () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch (error:any) {
      alert(error.message)
    }
  }

  return (
    <>
      <SafeAreaView className=" flex-row justify-between">
        <Text
          className="text-xl px-3"
          onPress={() => navigation.navigate("Dashboard")}
        >
          Rehab+
        </Text>
        <View className="flex-row mr-3">
          <Text className="px-3">Hello {FIREBASE_AUTH.currentUser?.email}</Text>
          <Button mode='contained' onPress={handleSignOut} icon="account">Sign Out</Button>
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
