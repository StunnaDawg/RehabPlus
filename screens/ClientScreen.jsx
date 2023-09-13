import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ClientTable from '../components/ClientScreenComponents/ClientTable'

const ClientScreen = () => {
  return (
    <ScrollView>
      <ClientTable />
    </ScrollView>
  )
}

export default ClientScreen