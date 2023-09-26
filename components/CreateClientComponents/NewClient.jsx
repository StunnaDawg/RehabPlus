import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import CreateButton from './components/CreateButton'

const NewClient = () => {
  const [nameText, setNameText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [email, setEmail] = useState("")
  return (
    <>
    <View className="mx-4 my-1">
        <Text>Client Name</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setNameText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Email</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>

      <CreateButton />
      </>
  )
}

export default NewClient