import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import UpdateClientButton from './components/EditButton'

const EditClient = () => {
    const [clientName, setClientName] = useState("")
    const [injuryOutline, setInjuryOutline] = useState("")
    const [email, setEmail] = useState("")
    const [active, setActive] = useState(true)
  
    return (
      <>
        <View className="mx-4 my-1">
          <Text>Client Name</Text>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setClientName(text)}
          ></TextInput>
        </View>
  
        <View className="mx-4 my-1">
          <Text>Outline</Text>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setInjuryOutline(text)}
          ></TextInput>
        </View>
  
        <View className="mx-4 my-1">
          <Text>Email</Text>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
  
        <UpdateClientButton />
      </>
    )
}

export default EditClient