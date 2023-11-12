import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { FIREBASE_AUTH, db } from '../../../firebase'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const DeleteButton = ({id, userId}) => {
    const navigation = useNavigation()
    const clientsCollectionRef = collection(db, "clients")
    const currentProtocol = doc(clientsCollectionRef, id)

    const onSubmitProtocol = async () => {
        if (userId == FIREBASE_AUTH?.currentUser?.uid) {
        try{
        await deleteDoc(currentProtocol)
        navigation.navigate("Client")
    } catch(err) {
        console.error(err)
    }
    } }
    
  return (
    <Button onPress={onSubmitProtocol}>
      Delete Protocol
    </Button>
  )
}

export default DeleteButton