import { View, Text, SafeAreaView, Button } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const DashboardScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <>
      <SafeAreaView >
        <NavBar />
      </SafeAreaView>

      <View className='flex-1'>

        <View className='flex-1'>
          <Button title="Inbox" onPress={() => navigation.navigate("Inbox")} />
        </View>

        <View className='flex-1'>
          <Button
            title="Protocols"
            onPress={() => navigation.navigate("Protocol")}
          />
        </View>

        <View className='flex-1'>
          <Button
            title="Client"
            onPress={() => navigation.navigate("Client")}
          />
        </View>

        <SafeAreaView >
          <Footer />
        </SafeAreaView>

      </View>
    </>
  )
}

export default DashboardScreen
