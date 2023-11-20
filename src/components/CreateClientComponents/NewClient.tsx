import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Checkbox, TextInput, Button } from "react-native-paper"
import CreateButton from "./components/CreateButton"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useEditClientContext } from "../../context/clientContext"
import { NavigationType } from "../../@types/navigation"

const NewClient = () => {
  const [clientName, setClientName] = useState("")
  const {clientEditData} = useEditClientContext()
  const [injuryOutline, setInjuryOutline] = useState("")
  const [email, setEmail] = useState("")
  const [active, setActive] = useState(true)
  const [protocol, setProtocol] = useState("")
  const navigation = useNavigation<NavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {
    let isMounted = true
    const updateStatePLEASE = async () => {
      try {
        if (clientEditData !== null && isMounted) {
          console.log("New CLient context state:", clientEditData)
          setProtocol(clientEditData.protocol)
          console.log("New Client protocol state:", protocol)
        }
      } catch (err) {
        console.error(err)
      }
    }

    updateStatePLEASE()
    return () => {
      isMounted = false
    }
  }, [isFocused, clientEditData])

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

      <View>
        <Text>{`${protocol}`}</Text>
        <Button onPress={() => navigation.navigate("AddProtocolScreen")}>
          Add Protocol
        </Button>
      </View>

      <CreateButton clientEmail={email} clientName={clientName} clientOutline={injuryOutline} active={active} protocolId={protocol}/>
    </>
  )
}

export default NewClient
