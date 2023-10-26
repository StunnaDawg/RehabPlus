import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, FIREBASE_AUTH } from '../../../firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import 'react-native-get-random-values'
import { useCurrentPhasesContext } from '../../../context/phasesAddContext'

const CreateButton = ({protocolTitle, protocolOutline, protocolPublic, protocolId}) => {
    const protocolsCollectionRef = doc(db, "protocols", protocolId)
const navigation = useNavigation()
    const onSubmitProtocol = async () => {
        try{
        await updateDoc(protocolsCollectionRef, {
            title: protocolTitle,
            description: protocolOutline,
            userId: FIREBASE_AUTH?.currentUser?.uid,
            public: protocolPublic
        })
          
      //   const workoutsSubCollectionRef = collection(protocolDocRef, 'workouts');
      //   console.log(protocolWorkouts)

      //   for (const workout of protocolWorkouts) {
      //     await addDoc(workoutsSubCollectionRef,{
      //       workout,
      //       userId: FIREBASE_AUTH?.currentUser?.uid,
      //     } );
      // }
        navigation.navigate("Protocol")
    } catch(err) {
        console.error(err)
    }
    }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Save</Button>
    </View>
  )
}

export default CreateButton