import { View, Text } from "react-native"
import React, { useState } from "react"
import { Checkbox, TextInput } from "react-native-paper"
import CreateButton from "./components/CreateButton"

const NewClient = () => {
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

      <CreateButton clientEmail={email} clientName={clientName} clientOutline={injuryOutline} active={active}/>
    </>
  )
}

export default NewClient
