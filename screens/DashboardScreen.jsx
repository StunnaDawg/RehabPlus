import { View, Text, SafeAreaView, Button } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"


const DashboardScreen = () => {
  const navigation = useNavigation()

  return (
    <>

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
            onPress={() => navigation.navigate("Clients")}
          />
        </View>


      </View>
    </>
  )
}

export default DashboardScreen
