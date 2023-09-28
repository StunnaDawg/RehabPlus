import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import NewClient from '../components/CreateClientComponents/NewClient'

const CreateNewClient = () => {
  return (
    <ScrollView>
      <NewClient />
    </ScrollView>
  )
}

export default CreateNewClient