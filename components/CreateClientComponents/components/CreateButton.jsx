import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection, doc } from 'firebase/firestore'
import { FIREBASE_AUTH, db } from '../../../firebase'

const CreateButton = ({clientName, clientOutline, active, clientEmail, protocolId}) => {
    const navigation = useNavigation()
    const clientsCollectionRef = collection(db, "clients")
    let protocolRef = null
    if(protocolId !== "") {
        protocolRef = doc(db, 'protocols', protocolId);
    }
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