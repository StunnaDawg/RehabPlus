import { View, Text, Pressable } from "react-native"
import { DataTable, Button, IconButton } from "react-native-paper"
import { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { db } from "../../firebase"
import { collection } from "firebase/firestore"
import GetSingleClient from "../../functions/getSingleClient"
import getClientFireStoreData from "../../functions/getClientFireStoreData"
import { useEditClientContext } from "../../context/clientContext"
import { Client } from "../../@types/firestore"
import { NavigationType, TabNavigationType } from "../../@types/navigation"

const ClientTable = () => {
  const {clientEditData, setClientEditData} = useEditClientContext()
  const [clientList, setClientList] = useState<Client[]>([])
  const clientsCollectionRef = collection(db, "clients")
  const navigation = useNavigation<NavigationType | TabNavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {

    const fetchFireStoredata = async () => {
      try {
        getClientFireStoreData(setClientList, clientsCollectionRef)
      }catch(err) {
        console.error(err)
       }
    }
   fetchFireStoredata()
  }, [isFocused])

  useEffect(() => {
      console.log(clientList)
  }, [clientList])

  useEffect(() => {
    console.log('client edit data in client table:', clientEditData)
  }, [clientEditData])

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title> </DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Protocol</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        {clientList?.map((client) => (
          <DataTable.Row key={client.id}>
            <DataTable.Cell
             onPress={async () => {
              try {
                 await GetSingleClient(
                  setClientEditData,
                  clientsCollectionRef,
                  client.id
                );
          
                navigation.navigate("EditClient");
              } catch (err) {
                console.error(err);
              }
            }}
            >
              <Button> Account</Button>
            </DataTable.Cell>
            <DataTable.Cell
              onPress={async () => {
                try {
                   await GetSingleClient(
                    setClientEditData,
                    clientsCollectionRef,
                    client.id
                  );
            
                  navigation.navigate("EditClient");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {client.name}
            </DataTable.Cell>
            <DataTable.Cell onPress={() => navigation.navigate("Protocol")}>
              {client?.protocol || "No Protocol"}
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
