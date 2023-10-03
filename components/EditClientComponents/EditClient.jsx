import { View, Text } from "react-native"
import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import UpdateClientButton from "./components/EditButton"
import { useSingleClientContext } from "../../clientContext"

const EditClient = () => {
  const [clientEditData] = useSingleClientContext()
  const [clientName, setClientName] = useState(clientEditData.name)
  const [injuryOutline, setInjuryOutline] = useState(clientEditData.injuryDescription)
  const [email, setEmail] = useState(clientEditData.email)
  const [protocol, setCurrentProtocol] = useState()

  return (
    <>
      <View className="mx-4 my-1">
        <Text>Client Name</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setClientName(text)}
          placeholder={clientEditData.name}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setInjuryOutline(text)}
          placeholder={clientEditData.injuryDescription}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Email</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          placeholder={clientEditData.email}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View>
        <Text>Current Protocol</Text>
        <Text>{clientEditData.clientProtocol.title}</Text>
        <Button>Change Protocol?</Button>
      </View>

      <UpdateClientButton
        clientEmail={email}
        clientName={clientName}
        clientInjuryDescription={injuryOutline}
        id={clientEditData.id}
        userId={clientEditData.userId}
      />
    </>
  )
}

export default EditClient
