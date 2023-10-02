import { View, Text, Pressable } from "react-native"
import { DataTable, Button, IconButton } from "react-native-paper"
import { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { db } from "../../firebase"
import { collection, getDoc } from "firebase/firestore"
import getFireStoreData from "../../functions/getFireStoreData"
import { useSingleClientContext } from "../../clientContext"
import GetSingleDoc from "../../functions/getSingleDoc"
import { protocolRefClient } from "../../functions/getClientProtocol"

const ClientTable = () => {
  const [clientEditData, setClientEditData] = useSingleClientContext()
  const [clientList, setClientList] = useState([])
  const clientsCollectionRef = collection(db, "clients")
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setClientList, clientsCollectionRef)
  }, [isFocused])

  useEffect(() => {
    protocolRefClient(clientEditData)
  }, [clientEditData])
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Protocol</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        {clientList.map((client) => (
          <DataTable.Row key={client.id}>
            <DataTable.Cell
              onPress={async () => {
                await GetSingleDoc(
                  setClientEditData,
                  clientsCollectionRef,
                  client.id
                )
                navigation.navigate("EditClient")
              }}
            >
              <Button icon="account-circle" size={20}></Button>
            </DataTable.Cell>
            <DataTable.Cell
              onPress={async () => {
                await GetSingleDoc(
                  setClientEditData,
                  clientsCollectionRef,
                  client.id
                )
                navigation.navigate("EditClient")
              }}
            >
              {client.name}
            </DataTable.Cell>
            <DataTable.Cell onPress={() => navigation.navigate("Protocol")}>
              {client.protocol}
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="checkbox-blank-circle"
                iconColor={client.status ? "green" : "red"}
              ></IconButton>
            </DataTable.Cell>
            {/* <DataTable.Cell><Button icon='account-eye'>View</Button></DataTable.Cell> */}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}

export default ClientTable
