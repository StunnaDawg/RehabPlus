import { View, Text, SafeAreaView } from "react-native"
import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import Footer from "./Footer"
import { Button } from "react-native-paper"
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebase"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const NavBar = () => {

  const handleSignOut =  () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch(error) {
      alert(error.message)
    }
      
  }

  return (
    <>
      <SafeAreaView className=" flex-row justify-between">
        <Text className="text-xl px-3">Rehab+</Text>
        <View className="flex-row mr-3">
          <Text className="px-3">Hello {FIREBASE_AUTH.currentUser?.email}</Text>
          <Button onPress={handleSignOut} size={25} icon="account" />
        </View>
      </SafeAreaView>
    </>
  )
}


export { NavBar }
