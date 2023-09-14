import { View, Text, Pressable } from 'react-native'
import { DataTable, Button, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ClientTable = () => {
    

    [testItems] = useState([
        {
            id: 1,
            clientName: 'Harold',
            protocol: 'ACL Phase 1',
            active: true
        },
        {
            id: 2,
            clientName: 'Kerry',
            protocol: 'ACL Phase 3',
            active: true
        },
        {
            id: 3,
            clientName: 'Jerry',
            protocol: 'ACL Phase 1',
            active: true
        },
        {
            id: 4,
            clientName: 'Danielle',
            protocol: 'ACL Phase 2',
            active: true
        },
        {
            id: 5,
            clientName: 'Kenny',
            protocol: 'none',
            active: false
        },
        {
            id: 6,
            clientName: 'Rudy',
            protocol: 'none',
            active: false
        },
    ])

const navigation = useNavigation()

  return (
    <View>
       <DataTable>
      <DataTable.Header>
      <DataTable.Title></DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Protocol</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        {testItems.map((item) => (
        <DataTable.Row key={item.id}>
        <DataTable.Cell onPress={() => {navigation.navigate("Dashboard")}}><Button icon="account-circle" size={20}></Button></DataTable.Cell>
        <DataTable.Cell onPress={() => navigation.navigate("Dashboard")}>{item.clientName}</DataTable.Cell>
          <DataTable.Cell onPress={() => navigation.navigate("Protocol")}>{item.protocol}</DataTable.Cell>
          <DataTable.Cell><IconButton icon='checkbox-blank-circle' iconColor={item.active ? 'green' : 'red'}></IconButton></DataTable.Cell>
          {/* <DataTable.Cell><Button icon='account-eye'>View</Button></DataTable.Cell> */}
        </DataTable.Row>
      ))}
      

      </DataTable>
    </View>
  )
}

export default ClientTable