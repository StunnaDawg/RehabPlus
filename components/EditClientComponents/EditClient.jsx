import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import UpdateClientButton from "./components/EditButton"
import { useSingleClientContext } from "../../clientContext"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useChangeClientProtocol } from "./functions/EditProtocolContext"

const EditClient = () => {
  const [clientEditData] = useSingleClientContext()
  const [newClientProtocol, setClientProtocol] = useChangeClientProtocol()
  const [clientName, setClientName] = useState(clientEditData.name)
  const [injuryOutline, setInjuryOutline] = useState(
    clientEditData.injuryDescription
  )
  const [email, setEmail] = useState(clientEditData.email)
  const [protocol, setCurrentProtocol] = useState(
    clientEditData.clientProtocolId
  )
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  useEffect(() => {
    let isMounted = true
    const updateStatePLEASE = async () => {
      try {
        if (newClientProtocol !== null && isMounted) {
          console.log("context state:", newClientProtocol)
          setCurrentProtocol(newClientProtocol)
          console.log("protocol state:", protocol)
        }
      } catch (err) {
        console.error(err)
      }
    }

    updateStatePLEASE()
    return () => {
      isMounted = false
    }
  }, [isFocused, newClientProtocol])

  useEffect(() => {
 console.log('edit client page data:', clientEditData)
  }, [])

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
        <Text>{`${protocol}`}</Text>
        <Button onPress={() => navigation.navigate("ChangeProtocolScreen")}>
          Change Protocol?
        </Button>
      </View>

      <UpdateClientButton
        clientEmail={email}
        clientName={clientName}
        clientInjuryDescription={injuryOutline}
        id={clientEditData.id}
        userId={clientEditData.userId}
        protocolId={`protocols/${protocol}`}
      />
    </>
  )
}

export default EditClient
