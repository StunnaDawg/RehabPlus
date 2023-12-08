import { View } from "react-native"
import { DataTable, Button, IconButton } from "react-native-paper"
import { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { db } from "../../../firebase"
import { CollectionReference } from "firebase/firestore"
import GetSingleClient from "../../../functions/getSingleClient"
import { useEditClientContext } from "../../../context/clientContext"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"
import { ClientPlusProtocolType } from "../ClientScreen"
import { Client } from "../../../@types/firestore"

type ClientTableProps = {
  otherClientList: Client[]
  clientList: ClientPlusProtocolType[]
  clientsCollectionRef: CollectionReference
}

const ClientTable = ({
  clientList,
  clientsCollectionRef,
  otherClientList,
}: ClientTableProps) => {
  const { setClientEditData } = useEditClientContext()
  const navigation = useNavigation<NavigationType | TabNavigationType>()

  useEffect(() => {
    console.log("client edit data in client table:", clientList)
  }, [clientList])

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title> </DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Protocol</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        {otherClientList?.map((client) => {
          return (
            <DataTable.Row key={client.id}>
              <DataTable.Cell
                onPress={async () => {
                  try {
                    console.log("client id", client.id)
                    await GetSingleClient(
                      setClientEditData,
                      clientsCollectionRef,
                      client.id
                    )

                    navigation.navigate("EditClient")
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                <Button> Account</Button>
              </DataTable.Cell>
              <DataTable.Cell
                onPress={async () => {
                  try {
                    console.log("client id", client.id)
                    await GetSingleClient(
                      setClientEditData,
                      clientsCollectionRef,
                      client.id
                    )
                    navigation.navigate("EditClient")
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                {client.name}
              </DataTable.Cell>
              <DataTable.Cell onPress={() => navigation.navigate("Protocol")}>
                Protocol
              </DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="checkbox-blank-circle"
                  iconColor={client.status ? "green" : "red"}
                ></IconButton>
              </DataTable.Cell>
              {/* <DataTable.Cell><Button icon='account-eye'>View</Button></DataTable.Cell> */}
            </DataTable.Row>
          )
        })}
      </DataTable>
    </View>
  )
}

export default ClientTable
