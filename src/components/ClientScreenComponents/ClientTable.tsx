import { View } from "react-native"
import { DataTable, Button, IconButton } from "react-native-paper"
import { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { db } from "../../firebase"
import { DocumentData, DocumentReference, collection } from "firebase/firestore"
import GetSingleClient from "../../functions/getSingleClient"
import getClientFireStoreData from "../../functions/getClientFireStoreData"
import { useEditClientContext } from "../../context/clientContext"
import { Client } from "../../@types/firestore"
import { NavigationType, TabNavigationType } from "../../@types/navigation"
import getDocumentRefData from "../../functions/getDocumentRefData"

type ClientPlusProtocolType = {
  id: string;
    email: string;
    injuryDescription: string;
    name: string;
    protocol: DocumentData | undefined;
    status: boolean;
    userId: string;
}

const ClientTable = () => {
  const {clientEditData, setClientEditData} = useEditClientContext()
  const [clientList, setClientList] = useState<Client[]>([])
  const [clientPlusProtocol ,setClientsPlusProtocol] = useState<ClientPlusProtocolType[]>([])
  const clientsCollectionRef = collection(db, "clients")
  const navigation = useNavigation<NavigationType | TabNavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchClientData = async () => {
      await getClientFireStoreData(setClientList, clientsCollectionRef)
      const clientData = await Promise.all(
        clientList.map(async(client) => {
          const protocol = getDocumentRefData(client.protocol)
          return {...client, protocol}
        })
      )
      setClientsPlusProtocol(clientData)
    }

    fetchClientData()
        
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
        {clientPlusProtocol?.map( (client) => {
        return (
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
            {client.protocol?.title ? client.protocol?.title : 'No protocol'}
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="checkbox-blank-circle"
                iconColor={client.status ? "green" : "red"}
              ></IconButton>
            </DataTable.Cell>
            {/* <DataTable.Cell><Button icon='account-eye'>View</Button></DataTable.Cell> */}
          </DataTable.Row>
        )})}
      </DataTable>
    </View>
  )
}

export default ClientTable
