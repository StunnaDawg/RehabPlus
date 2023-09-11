import { View, Text, ScrollView } from 'react-native'
import {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { DataTable, Button, IconButton } from 'react-native-paper';
import { UserIcon } from "react-native-heroicons/solid"

const ClientWidget = () => {

    const [items] = useState([
        {
          key: 1,
          name: 'Harold',
          Protocol: 'Acl Phase 1',
        },
        {
            key: 2,
            name: 'Jerry',
            Protocol: 'Acl Phase 1',
          },
          {
            key: 3,
            name: 'Kerry',
            Protocol: 'Acl Phase 3',
          },
          {
            key: 4,
            name: 'Danielle',
            Protocol: 'Acl Phase 2',
          },
       ]);

    const navigation = useNavigation()
  return (
    <View className='flex-1 mx-4'>
    <View className="flex-row justify-between" >
        <Text className="text-3xl font-bold">Active Clients</Text>
          <Button
          icon='account-box-multiple'
            onPress={() => navigation.navigate("Clients")}
          >View All</Button>
        </View>

        <ScrollView>
        <DataTable>
      <DataTable.Header>
      <DataTable.Title></DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Protocol</DataTable.Title>
        <DataTable.Title></DataTable.Title>
      </DataTable.Header>

      {items.map((item) => (
        <DataTable.Row key={item.key}>
            <DataTable.Cell><IconButton icon="account-circle" size={20}></IconButton></DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.Protocol}</DataTable.Cell>
          <DataTable.Cell><Button icon='account-eye'>View</Button></DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
    </ScrollView>
        </View>
  )
}

export default ClientWidget