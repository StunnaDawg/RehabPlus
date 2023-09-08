import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const NavBar = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    }, [])
  return (
    <SafeAreaView >
      <Text className="bg-red-500">NavBar</Text>
    </SafeAreaView>
  )
}

export default NavBar