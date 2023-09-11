import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ClientWidget = () => {
    const navigation = useNavigation()
  return (
    <View className='flex-1'>
          <Button
            title="Client"
            onPress={() => navigation.navigate("Clients")}
          />
        </View>
  )
}

export default ClientWidget