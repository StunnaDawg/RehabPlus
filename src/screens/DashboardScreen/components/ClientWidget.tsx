import { View, Text, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { DataTable, Button, IconButton } from "react-native-paper"
import { db } from "../../../firebase"
import { collection } from "firebase/firestore"
import { TabNavigationType } from "../../../@types/navigation"
import { Client } from "../../../@types/firestore"
import getClientFireStoreData from "../../../functions/getClientFireStoreData"

const ClientWidget = () => {
  const [clientWidgetList, setClientWidgetList] = useState<Client[]>([])
  const clientsCollectionRef = collection(db, "clients")
  const navigation = useNavigation<TabNavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {
    getClientFireStoreData(setClientWidgetList, clientsCollectionRef)
    console.log("dashboard client")
  }, [isFocused])
  return (
    <View className="flex-1 mx-4 mt-3">
      <View className="flex-row justify-between">
        <Text className="text-3xl font-bold">Active Clients</Text>
        <Button
          icon="account-box-multiple"
          onPress={() => navigation.navigate("Client")}
        >
          View All
        </Button>
      </View>

      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title> </DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Protocol</DataTable.Title>
            <DataTable.Title> </DataTable.Title>
          </DataTable.Header>

          {clientWidgetList?.map((client) =>
            client.status ? (
              <DataTable.Row key={client.id}>
                <DataTable.Cell>
                  <IconButton icon="account-circle" size={20}></IconButton>
                </DataTable.Cell>
                <DataTable.Cell>{client.name}</DataTable.Cell>
                <DataTable.Cell>protocol</DataTable.Cell>
                <DataTable.Cell>
                  <Button icon="account-eye">View</Button>
                </DataTable.Cell>
              </DataTable.Row>
            ) : null
          )}
        </DataTable>
      </ScrollView>
    </View>
  )
}

export default ClientWidget
