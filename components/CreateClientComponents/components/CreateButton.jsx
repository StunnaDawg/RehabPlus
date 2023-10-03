import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import { FIREBASE_AUTH, db } from '../../../firebase'

const CreateButton = ({clientName, clientOutline, active, clientEmail}) => {
    const navigation = useNavigation()
    const clientsCollectionRef = collection(db, "clients")
    const protocolRef = doc(db, "protocols", "JGTIoQp9tYTvWvYoZ6Y4");

    const onSubmitClient = async () => {
        try{
        await addDoc(clientsCollectionRef, {
            name: clientName,
            injuryDescription: clientOutline,
            status: active,
            email: clientEmail,
            userId: FIREBASE_AUTH?.currentUser?.uid,
            protocol: protocolRef
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