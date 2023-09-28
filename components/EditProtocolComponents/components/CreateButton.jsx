import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, FIREBASE_AUTH } from '../../../firebase'
import { updateDoc, collection } from 'firebase/firestore'

const UpdateButton = ({protocolTitle, protocolOutline, protocolDaysPerWeek, protocolWeeks, id}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "protocols")
    const currentProtocol = (protocolsCollectionRef, id)

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

export default UpdateButton