import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, FIREBASE_AUTH } from '../../../firebase'
import { addDoc, collection } from 'firebase/firestore'

const CreateButton = ({protocolTitle, protocolOutline, protocolDaysPerWeek, protocolWeeks}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "protocols")

    const onSubmitProtocol = async () => {
        try{
        await addDoc(protocolsCollectionRef, {
            title: protocolTitle,
            description: protocolOutline,
            daysPerWeek: protocolDaysPerWeek,
            weeks: protocolWeeks,
            userId: FIREBASE_AUTH?.currentUser?.uid
        })
        navigation.navigate("Protocol")
    } catch(err) {
        console.error(err)
    }
    }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Create Protocol</Button>
    </View>
  )
}

export default CreateButton