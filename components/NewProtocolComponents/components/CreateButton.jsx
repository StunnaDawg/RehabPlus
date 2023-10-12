import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, FIREBASE_AUTH } from '../../../firebase'
import { addDoc, collection } from 'firebase/firestore'

const CreateButton = ({protocolTitle, protocolOutline, protocolDaysPerWeek, protocolWeeks, protocolPublic, protocolWorkouts}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "protocols")

    const onSubmitProtocol = async () => {
        try{
        const protocolDocRef = await addDoc(protocolsCollectionRef, {
            title: protocolTitle,
            description: protocolOutline,
            daysPerWeek: protocolDaysPerWeek,
            weeks: protocolWeeks,
            userId: FIREBASE_AUTH?.currentUser?.uid,
            public: protocolPublic
        })
          // 2. Now, add a document to the "workouts" sub-collection of the newly created protocol document
        // First, get the reference to the sub-collection
        const workoutsSubCollectionRef = collection(protocolDocRef, 'workouts');
        console.log(protocolWorkouts)
        // Add a document to the sub-collection (assuming you have some workoutData you want to add)

        for (const workout of protocolWorkouts) {
          await addDoc(workoutsSubCollectionRef,{
            workout,
            userId: FIREBASE_AUTH?.currentUser?.uid,
          } );
      }

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