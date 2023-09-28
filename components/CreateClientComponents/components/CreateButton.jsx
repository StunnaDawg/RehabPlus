import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import { FIREBASE_AUTH, db } from '../../../firebase'

const CreateButton = ({clientName, clientOutline, active, clientEmail}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "clients")

    const onSubmitClient = async () => {
        try{
        await addDoc(protocolsCollectionRef, {
            name: clientName,
            injuryDescription: clientOutline,
            status: active,
            email: clientEmail,
            userId: FIREBASE_AUTH?.currentUser?.uid
        })
        navigation.navigate("Client")
    } catch(err) {
        console.error(err)
    }
    }
  return (
    <View>
      <Button onPress={onSubmitClient}> Create Client </Button>
    </View>
  )
}

export default CreateButton