import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CreateButton = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Button onPress={() => navigation.navigate("Protocol")}>Create Protocol</Button>
    </View>
  )
}

export default CreateButton