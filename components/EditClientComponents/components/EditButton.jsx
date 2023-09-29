import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../firebase'
import { updateDoc, collection, doc } from 'firebase/firestore'

const UpdateClientButton = ({ id }) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "client")
    // const currentProtocol = doc(protocolsCollectionRef, id)

    const onSubmitProtocol = async () => {
        try{
        await updateDoc(currentProtocol, {
            title: protocolTitle,
            description: protocolOutline,
            daysPerWeek: protocolDaysPerWeek,
            weeks: protocolWeeks,
        })
        navigation.navigate("Protocol")
    } catch(err) {
        console.error(err)
    }
    }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Update Protocol</Button>
    </View>
  )
}

export default UpdateClientButton