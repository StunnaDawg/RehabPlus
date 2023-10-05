import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../firebase'
import { updateDoc, collection, doc } from 'firebase/firestore'

const UpdateButton = ({protocolTitle, protocolOutline, protocolDaysPerWeek, protocolWeeks, id, protocolPublic}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "protocols")
    const currentProtocol = doc(protocolsCollectionRef, id)

    const onSubmitProtocol = async () => {
        try{
        await updateDoc(currentProtocol, {
            title: protocolTitle,
            description: protocolOutline,
            daysPerWeek: protocolDaysPerWeek,
            weeks: protocolWeeks,
            public: protocolPublic
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

export default UpdateButton