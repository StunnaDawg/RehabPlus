import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, TextInput } from "react-native-paper"
import DeleteButton from "./components/DeleteClientButton"
import UpdateClientButton from "./components/UpdateClientButton"
import { useEditClientContext } from "../../../context/clientContext"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useAddClientProtocolContext } from "../../../context/EditProtocolContext"
import { NavigationType } from "../../../@types/navigation"
import ProtocolEditScreenWidget from "./components/ProtocolScreenWidget"
import GetSingleDoc from "../../../functions/getSingleDoc"
import { Protocol } from "../../../@types/firestore"
import { db } from "../../../firebase"
import { collection, doc } from "firebase/firestore"

const EditClient = () => {
  const { clientEditData } = useEditClientContext()
  const { newClientProtocol } = useAddClientProtocolContext()
  const [clientName, setClientName] = useState("")
  const [injuryOutline, setInjuryOutline] = useState(
    clientEditData.injuryDescription
  )
  const [email, setEmail] = useState("")
  const [protocol, setCurrentProtocol] = useState<Protocol>({} as Protocol)
  const isFocused = useIsFocused()
  const navigation = useNavigation<NavigationType>()
  const protocolRef = collection(db, "protocols")

  useEffect(() => {
    console.log(clientEditData.protocol)
    const getProtocolData = async () => {
      GetSingleDoc(setCurrentProtocol, protocolRef, clientEditData.protocol)
    }
    getProtocolData()
  }, [isFocused])

  useEffect(() => {
    const getProtocolData = async () => {
      GetSingleDoc(setCurrentProtocol, protocolRef, newClientProtocol)
    }
    getProtocolData()
  }, [newClientProtocol])

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
        <ProtocolEditScreenWidget
          protocolTitle={protocol.title}
          imageUri={protocol.imageUri}
          id={protocol.id}
          assigned={false}
        />
        <Button
          textColor="black"
          onPress={() => navigation.navigate("ChangeProtocolScreen")}
        >
          Change Protocol?
        </Button>
      </View>

      <UpdateClientButton
        clientEmail={email !== "" ? email : clientEditData.email}
        clientName={clientName !== "" ? clientName : clientEditData.name}
        clientInjuryDescription={
          injuryOutline !== ""
            ? injuryOutline
            : clientEditData.injuryDescription
        }
        id={clientEditData.id}
        userId={clientEditData.userId}
        protocolId={newClientProtocol !== "" ? newClientProtocol : protocol.id}
      />

      {/* <DeleteButton id={clientEditData.id} userId={clientEditData.userId} /> */}
    </>
  )
}

export default EditClient
