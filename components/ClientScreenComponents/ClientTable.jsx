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
  const [clientProtocol, setClientProtocol] = useState([])
  const [selectedClient, setSelectedClient] = useState([])
  const clientsCollectionRef = collection(db, "clients")
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setClientList, clientsCollectionRef)
  }, [isFocused])

  // useEffect(() => {
  //   console.log('selected client', {selectedClient}, 'client protocol', {clientProtocol})
  // }, [selectedClient, clientProtocol])

  // useEffect(() => {
  //   console.log('client edit data:', clientEditData)
  // }, [clientEditData])

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
              try {
                const selectedClientData = await GetSingleDoc(
                  setSelectedClient,
                  clientsCollectionRef,
                  client.id
                );
                setSelectedClient(selectedClientData); // set state here
          
                const protocolData = await protocolRefClient(
                  selectedClientData,
                  setClientProtocol
                );
                setClientProtocol(protocolData); // set state here
          
                const editData = {
                  selectedClient: selectedClientData,
                  clientProtocol: protocolData,
                };
                setClientEditData(editData); // set state here
          
                // navigation.navigate("EditClient");
              } catch (err) {
                console.error(err);
              }
            }}
            >
              <Button icon="account-circle" size={20}></Button>
            </DataTable.Cell>
            <DataTable.Cell
              onPress={async () => {
                try {
                  const selectedClientData = await GetSingleDoc(
                    setSelectedClient,
                    clientsCollectionRef,
                    client.id
                  );
                  setSelectedClient(selectedClientData); // set state here
            
                  const protocolData = await protocolRefClient(
                    selectedClientData,
                    setClientProtocol
                  );
                  setClientProtocol(protocolData); // set state here
            
                  const editData = {
                    selectedClient: selectedClientData,
                    clientProtocol: protocolData,
                  };
                  setClientEditData(editData); // set state here
            
                  // navigation.navigate("EditClient");
                } catch (err) {
                  console.error(err);
                }
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
